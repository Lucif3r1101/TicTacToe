import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import SymbolSelector from './components/SymbolSelector';
import { calculateWinner } from './utils/helpers';
import Confetti from 'react-confetti';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const API_URL = 'https://hiring-react-assignment.vercel.app/api/bot';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [playerName, setPlayerName] = useState('');
  const [isGameReady, setIsGameReady] = useState(false);

  const getBotSymbol = useCallback(() => (playerSymbol === 'X' ? 'O' : 'X'), [playerSymbol]);

  const handlePlayerSelect = (symbol, name) => {
    setPlayerSymbol(symbol);
    setPlayerName(name);
    setIsPlayerTurn(symbol === 'X'); // X player always goes first
    setIsGameReady(true);
  };

  const makeMove = useCallback(
    (index, symbol) => {
      if (board[index] || winnerInfo) return;
      const updated = [...board];
      updated[index] = symbol;
      setBoard(updated);
      const result = calculateWinner(updated);
      if (result) {
        setWinnerInfo(result);
      } else {
        setIsPlayerTurn(symbol !== playerSymbol);
      }
    },
    [board, playerSymbol, winnerInfo]
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPlayerTurn || winnerInfo) return;
    (async () => {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(board),
        });
        const move = await res.json();
        makeMove(move, getBotSymbol());
      } catch {}
    })();
  }, [isPlayerTurn, board, winnerInfo, getBotSymbol, makeMove]);

  const handleClick = (i) => {
    if (!playerSymbol || !isPlayerTurn || board[i] || winnerInfo) return;
    makeMove(i, playerSymbol);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinnerInfo(null);
    setIsPlayerTurn(true);
  };

  const restartGame = () => {
    resetGame();
    setPlayerSymbol(null);
    setIsGameReady(false);
    setPlayerName('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontFamily: 'Quicksand', color: '#fff' }}
        >
          Tic Tac Toe vs Bot
        </Typography>
      </motion.div>

      {winnerInfo?.winner === playerSymbol && <Confetti width={width} height={height} />}

      {!isGameReady ? (
        <Box textAlign="center" mt={4}>
          {/* Name Input and Symbol Selection only in SymbolSelector */}
          <SymbolSelector onSelect={handlePlayerSelect} />
        </Box>
      ) : (
        <>
          <Board
            squares={board}
            onClick={handleClick}
            winningLine={winnerInfo?.line || []}
          />
          <Box textAlign="center" mt={2}>
            {winnerInfo ? (
              <>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Quicksand', color: '#fff' }}>
                  {winnerInfo.winner === playerSymbol
                    ? `🎉 ${playerName} Wins!`
                    : '🤖 Bot Wins!'}
                </Typography>
                <Button variant="contained" onClick={resetGame} sx={{ mt: 2 }}>
                  Play Again
                </Button>
              </>
            ) : board.includes(null) ? (
              <Typography variant="h6" sx={{ fontFamily: 'Rubik', color: '#fff' }}>
                {isPlayerTurn ? `${playerName}'s Turn` : 'Bot is thinking...'}
                {!isPlayerTurn && <CircularProgress size={20} sx={{ color: '#fff', marginLeft: '10px' }} />}
              </Typography>
            ) : (
              <>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Quicksand', color: '#fff' }}>
                  It’s a Draw!
                </Typography>
                <Button variant="contained" onClick={resetGame} sx={{ mt: 2 }}>
                  Play Again
                </Button>
              </>
            )}
          </Box>
          {(winnerInfo || !board.includes(null)) && (
            <Box textAlign="center" mt={2}>
              <Button variant="outlined" onClick={restartGame}>
                Restart Game (Select X / O)
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default App;
