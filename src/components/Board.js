import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick, winningLine }) => {
  return (
    <div className="board">
      {squares.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          onClick={() => onClick(idx)}
          isWinning={winningLine.includes(idx)} 
        />
      ))}
    </div>
  );
};

export default Board;
