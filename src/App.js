import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import SymbolSelector from './components/SymbolSelector';
import { calculateWinner } from './utils/helpers';
import Confetti from 'react-confetti';

const API_URL = 'https://hiring-react-assignment.vercel.app/api/bot';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const getBotSymbol = useCallback(
    () => (playerSymbol === 'X' ? 'O' : 'X'),
    [playerSymbol]
  );

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

  const handleClick = i => {
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
  };

  return (
    <div className="app">
      {winnerInfo?.winner === playerSymbol && (
        <Confetti width={width} height={height} />        
      )}

      <h1>Tic Tac Toe vs Bot</h1>
      {!playerSymbol ? (
        <SymbolSelector onSelect={setPlayerSymbol} />
      ) : (
        <>
          <Board
            squares={board}
            onClick={handleClick}
            winningLine={winnerInfo?.line || []}
          />
          <div className="status">
            {winnerInfo ? (
              <>
                <p>
                  {winnerInfo.winner === playerSymbol
                    ? '🎉 You Win!'
                    : '🤖 Bot Wins!'}
                </p>
                <button onClick={resetGame}>Play Again</button>
              </>
            ) : board.includes(null) ? (
              <p>{isPlayerTurn ? 'Your Turn' : 'Bot is thinking...'}</p>
            ) : (
              <>
                <p>It’s a Draw!</p>
                <button onClick={resetGame}>Play Again</button>
              </>
            )}
          </div>
          {(winnerInfo || !board.includes(null)) && (
            <button onClick={restartGame} className="restart-btn">
              Restart Game (Select X / O)
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
