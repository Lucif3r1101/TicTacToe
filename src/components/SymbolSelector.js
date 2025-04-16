import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const noCaretTypographyStyle = {
  userSelect: 'none',
  caretColor: 'transparent',
};

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
          <Typography 
            variant="h5" 
            sx={{ 
              fontFamily: 'Quicksand', 
              color: 'white',
              ...noCaretTypographyStyle 
            }}
          >
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

              '& .MuiInputLabel-root': {
                color: 'black',
                '&.Mui-focused': {
                  color: 'black', 
                }
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                },
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
            fullWidth
            inputProps={{
              style: { cursor: 'text' },
            }}
            InputProps={{
              style: { caretColor: 'white' },
            }}
          />
          <Button
            variant="contained"
            onClick={handleStartGame}
            sx={{ mt: 2, cursor: 'pointer' }}
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
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Quicksand', 
                color: 'white',
                ...noCaretTypographyStyle
              }}
            >
              Welcome {name}!
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Quicksand', 
                color: 'white',
                ...noCaretTypographyStyle
              }}
            >
              Now, choose your symbol!
            </Typography>
          </motion.div>

          <Box
            mt={3}
            display="flex"
            justifyContent="center"
            gap={2}
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
                  cursor: 'pointer',
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
                  cursor: 'pointer',
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