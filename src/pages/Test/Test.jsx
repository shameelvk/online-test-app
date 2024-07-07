import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextareaAutosize, Paper, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import { useData } from '../../context/TestContext';

const Test = () => {
  const { category } = useData();
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Grid container spacing={2} justifyContent="center" sx={{ height: '100%' }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            {formatTime(timer)}
          </Typography>
        </Grid>
        <Grid item xs={12} container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={12} md={6} sx={{ height: '100%' }}>
            <Box sx={{ padding: '1rem' }}>
              <Typography variant="h6">
                Question 1 of 30
              </Typography>
              <Typography variant="h5" sx={{ margin: '1rem 0' }}>
                Who is the father of computer?
              </Typography>
              <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                <FormControlLabel value="option1" control={<Radio />} label="Charles Babbage" />
                <FormControlLabel value="option2" control={<Radio />} label="Alan Turing" />
                <FormControlLabel value="option3" control={<Radio />} label="John von Neumann" />
                <FormControlLabel value="option4" control={<Radio />} label="George Boole" />
              </RadioGroup>
              <Box sx={{ display: 'flex', marginTop: '2rem',gap:1 }}>
                <Button variant="outlined">Exit</Button>
                <Button variant="contained">Next</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ height: '100%' }}>
            <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '8px', height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #000', paddingBottom: '0.5rem', width: '100%' }}>
                Notepad
              </Typography>
              <TextareaAutosize
                placeholder="Describe your note here..."
                style={{ width: '100%',height:'50%', padding: '0.5rem', backgroundColor: '#ffffff', border: 'none', borderRadius: '4px', resize: 'none' }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Test;
