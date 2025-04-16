import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Board from './components/Board';
import SymbolSelector from './components/SymbolSelector';
import { calculateWinner } from './utils/helpers';
import Confetti from 'react-confetti';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const API_URL = 'https://hiring-react-assignment.vercel.app/api/bot';

// Global style to apply to all Typography components
const noCaretTypographyStyle = {
  userSelect: 'none',
  caretColor: 'transparent',
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [playerName, setPlayerName] = useState('');
  const [isGameReady, setIsGameReady] = useState(false);

  // Memoized getBotSymbol function
  const getBotSymbol = useCallback(() => (playerSymbol === 'X' ? 'O' : 'X'), [playerSymbol]);

  // Memoized handlePlayerSelect function
  const handlePlayerSelect = useCallback((symbol, name) => {
    setPlayerSymbol(symbol);
    setPlayerName(name);
    setIsPlayerTurn(symbol === 'X'); // X player always goes first
    setIsGameReady(true);
  }, []);

  const makeMove = useCallback(
    (index, symbol) => {
      if (board[index] || winnerInfo) return;
      
      setBoard(prevBoard => {
        const updated = [...prevBoard];
        updated[index] = symbol;
        
        // Check for winner after move
        const result = calculateWinner(updated);
        if (result) {
          setWinnerInfo(result);
        } else {
          setIsPlayerTurn(symbol !== playerSymbol);
        }
        
        return updated;
      });
    },
    [playerSymbol, winnerInfo]
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

    // Bot move logic
    (async () => {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(board),
        });
        const move = await res.json();
        if (typeof move === 'number') {
          makeMove(move, getBotSymbol());
        }
      } catch (error) {
        console.error('Error fetching bot move:', error);
      }
    })();
  }, [isPlayerTurn, board, winnerInfo, getBotSymbol, makeMove]);

  // Memoized handleClick function
  const handleClick = useCallback((i) => {
    if (!playerSymbol || !isPlayerTurn || board[i] || winnerInfo) return;
    makeMove(i, playerSymbol);
  }, [playerSymbol, isPlayerTurn, board, winnerInfo, makeMove]);

  // Memoized resetGame function
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setWinnerInfo(null);
    setIsPlayerTurn(playerSymbol === 'X');  // Reset based on player symbol
  }, [playerSymbol]);

  // Memoized restartGame function
  const restartGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setWinnerInfo(null);
    setPlayerSymbol(null);
    setIsGameReady(false);
    setPlayerName('');
  }, []);

  // Memoize winningLine to prevent unnecessary re-renders
  const winningLine = useMemo(() => winnerInfo?.line || [], [winnerInfo]);

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
          sx={{ 
            fontFamily: 'Quicksand', 
            color: '#fff',
            ...noCaretTypographyStyle
          }}
        >
          Tic Tac Toe vs Bot
        </Typography>
      </motion.div>

      {winnerInfo?.winner === playerSymbol && <Confetti width={width} height={height} />}

      {!isGameReady ? (
        <Box textAlign="center" mt={4}>
          <SymbolSelector onSelect={handlePlayerSelect} />
        </Box>
      ) : (
        <>
          <Board
            squares={board}
            onClick={handleClick}
            winningLine={winningLine}
          />
          <Box textAlign="center" mt={2}>
            {winnerInfo ? (
              <>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: 'Quicksand', 
                    color: '#fff',
                    ...noCaretTypographyStyle
                  }}
                >
                  {winnerInfo.winner === playerSymbol
                    ? `🎉 ${playerName} Wins!`
                    : '🤖 Bot Wins!'}
                </Typography>
                <Button variant="contained" onClick={resetGame} sx={{ mt: 2 }}>
                  Play Again
                </Button>
              </>
            ) : board.includes(null) ? (
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: 'Rubik', 
                  color: '#fff',
                  ...noCaretTypographyStyle
                }}
              >
                {isPlayerTurn ? `${playerName}'s Turn` : 'Bot is thinking...'}
                {!isPlayerTurn && <CircularProgress size={20} sx={{ color: '#fff', marginLeft: '10px' }} />}
              </Typography>
            ) : (
              <>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: 'Quicksand', 
                    color: '#fff',
                    ...noCaretTypographyStyle
                  }}
                >
                  It's a Draw!
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