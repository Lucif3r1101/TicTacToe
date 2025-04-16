import React from 'react';
import Square from './Square';
import { Box } from '@mui/material';

const Board = ({ squares, onClick, winningLine }) => {
  return (
    <Box
      className="board"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 100px)',
        gap: 2,
        justifyContent: 'center',
        marginTop: 2,
      }}
    >
      {squares.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          onClick={() => onClick(idx)}
          isWinning={winningLine.includes(idx)}
        />
      ))}
    </Box>
  );
};

export default Board;
