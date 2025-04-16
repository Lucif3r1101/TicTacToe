import React, { memo } from 'react';

// Optimized Square component that only re-renders when props change
const Square = memo(({ value, onClick, isWinning }) => {
  const squareClass = `square ${value || ''} ${isWinning ? 'winning' : ''}`;
  
  return (
    <div 
      className={squareClass}
      onClick={onClick}
    >
      {value}
    </div>
  );
});

// Board component using the optimized Square
const Board = ({ squares, onClick, winningLine }) => {
  // Function to render a single square
  const renderSquare = (i) => {
    const isWinning = winningLine.includes(i);
    
    return (
      <Square 
        key={i}
        value={squares[i]} 
        onClick={() => onClick(i)}
        isWinning={isWinning}
      />
    );
  };

  // Create board grid
  return (
    <div className="board">
      {Array(9).fill(null).map((_, i) => renderSquare(i))}
    </div>
  );
};

export default memo(Board);