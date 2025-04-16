import React from 'react';
import { Box } from '@mui/material';

const Square = React.memo(({ value, onClick, isWinning }) => {
  return (
    <Box
      className={`square ${isWinning ? 'winning' : ''}`}
      onClick={onClick}
      sx={{
        width: 100,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #cfd8dc',
        borderRadius: 2,
        backgroundColor: '#f4f6f8',
        fontSize: '3rem',
        fontWeight: 700,
        color: value === 'X' ? '#ff6f61' : '#4dd0e1',
        fontFamily: 'Orbitron, Poppins, sans-serif',
        cursor: value ? 'not-allowed' : 'pointer', // Change cursor when square is filled
        transition: 'all 0.25s ease',
        '&:hover': {
          backgroundColor: '#e0e7ee',
        },
        animation: 'fadeInMove 0.3s ease',
      }}
    >
      {value}
    </Box>
  );
});

export default Square;
