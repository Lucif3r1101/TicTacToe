import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SymbolSelector = ({ onSelect }) => {
  const [name, setName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStartGame = () => {
    if (!name.trim()) return alert("Please enter your name!");
    setIsNameEntered(true);
  };

  const handleSymbolSelect = (symbol) => {
    onSelect(symbol, name.trim());
  };

  return (
    <Box textAlign="center" className="symbol-selector">
      {!isNameEntered ? (
        <>
          <Typography variant="h5" sx={{ fontFamily: 'Quicksand', color: 'white' }}>
            Enter Your Name
          </Typography>
          <TextField
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            sx={{ 
              mt: 2, 
              input: { color: 'white' }, 
              label: { color: '#ccc' },
              '& input': {
                caretColor: isNameEntered ? 'transparent' : 'initial', // Hide caret after name is entered
              }
            }}
            fullWidth
            inputProps={{ style: { cursor: 'text' } }} // Cursor set to text for name input
          />
          <Button
            variant="contained"
            onClick={handleStartGame}
            sx={{ mt: 2, cursor: 'pointer' }} // Pointer cursor on button
          >
            Start Game
          </Button>
        </>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" sx={{ fontFamily: 'Quicksand', color: 'white' }}>
              Welcome {name}!
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typography variant="h6" sx={{ fontFamily: 'Quicksand', color: 'white' }}>
              Now, choose your symbol!
            </Typography>
          </motion.div>

          <Box
            mt={3}
            display="flex" // Ensures buttons are side by side
            justifyContent="center" // Centers buttons horizontally
            gap={2} // Adds space between buttons
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Button
                variant="contained"
                onClick={() => handleSymbolSelect('X')}
                sx={{
                  fontSize: '24px',
                  padding: '15px 30px',
                  margin: '10px',
                  backgroundColor: '#ff5e5e',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#e53e3e',
                  },
                  cursor: 'pointer',  // Pointer cursor on symbol select button
                }}
              >
                X
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Button
                variant="contained"
                onClick={() => handleSymbolSelect('O')}
                sx={{
                  fontSize: '24px',
                  padding: '15px 30px',
                  margin: '10px',
                  backgroundColor: '#5e9cff',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#3c8cd1',
                  },
                  cursor: 'pointer', // Pointer cursor on symbol select button
                }}
              >
                O
              </Button>
            </motion.div>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SymbolSelector;
