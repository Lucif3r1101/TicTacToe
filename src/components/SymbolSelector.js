import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const SymbolSelector = ({ onSelect }) => {
  return (
    <Box className="symbol-selector" textAlign="center">
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Choose Your Symbol
      </Typography>
      <Button variant="outlined" onClick={() => onSelect('X')} sx={{ marginRight: 2 }}>
        Play as X
      </Button>
      <Button variant="outlined" onClick={() => onSelect('O')}>
        Play as O
      </Button>
    </Box>
  );
};

export default SymbolSelector;
