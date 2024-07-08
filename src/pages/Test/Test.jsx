import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextareaAutosize, Paper, Radio, RadioGroup, FormControlLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useData } from '../../context/TestContext';
import ExitDialog from '../../components/ExitDialog/ExitDialog';

const Test = () => {
  const navigate = useNavigate(); 
  const {
    score,
    setScore,
    questionsData,
    setQuestionsData,
    wrongScore,
    setWrongScore,
    skippedScore,
    setSkippedScore,
  } = useData();
  const [timer, setTimer] = useState(300); 
  const [selectedOption, setSelectedOption] = useState('');
  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const [isOptionClicked, setIsOptionClicked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); 

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev > 0) return prev - 1;
        clearInterval(countdown);
        handleTestCompletion();
        return 0;
      });
    }, 1000);

    if (currentQuesIndex === questionsData.length) {
      handleTestCompletion();
    }

    return () => clearInterval(countdown);
  }, [currentQuesIndex]);

 

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsOptionClicked(true);
  };

  const handleNextBtn = () => {
    const currentQuestion = questionsData[currentQuesIndex];
    if (selectedOption) {
      if (selectedOption === currentQuestion.correct_option) {
        setScore(score + 1);
      } else {
        setWrongScore(wrongScore + 1);
      }
    }

    if (!isOptionClicked) {
      setSkippedScore(skippedScore + 1);
    }

    const nextQuestion = currentQuesIndex + 1;
    setCurrentQuesIndex(nextQuestion);
    setSelectedOption('');
    setIsOptionClicked(false);
  };

  const handleTestCompletion = () => {
    setSkippedScore(skippedScore + questionsData.length - currentQuesIndex);
    navigate('/result'); 
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleContinue = () => {
    handleTestCompletion();
    setOpenDialog(false);
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
                Question {currentQuesIndex + 1} of {questionsData.length}
              </Typography>
              <Typography variant="h5" sx={{ margin: '1rem 0' }}>
                {questionsData[currentQuesIndex]?.question}
              </Typography>
              <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                {questionsData[currentQuesIndex].options?.map((item) => (
                  <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.value} />
                ))}
              </RadioGroup>
              <Box sx={{ display: 'flex', marginTop: '2rem', gap: 1 }}>
                <Button variant="outlined" onClick={handleOpenDialog}>Exit</Button>
                <Button variant="contained" onClick={handleNextBtn}>Next</Button>
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
                style={{ width: '100%', height: '50%', padding: '0.5rem', backgroundColor: '#ffffff', border: 'none', borderRadius: '4px', resize: 'none' }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {openDialog && (
        <ExitDialog handleCloseDialog={handleCloseDialog} openDialog={openDialog} handleContinue={handleContinue} />
      )}
    </Box>
  );
};

export default Test;
