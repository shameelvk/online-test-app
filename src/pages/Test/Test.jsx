import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextareaAutosize, Paper, Radio, RadioGroup, FormControlLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';;
import { useData } from '../../context/TestContext';
import { Link } from 'react-router-dom';

const Test = () => {
  const {
    category,
    setCategory,
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
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog open/close

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
    setIsOptionClicked(true);
  };

  const handleNextBtn = () => {
    const currentQuestion = questionsData[currentQuesIndex];
    if (selectedOption) {
      if (selectedOption == currentQuestion.correct_option) {
        setScore(score + 1);
      } else {
        setWrongScore(wrongScore + 1);
      }
    }

    const nextQuestion = currentQuesIndex + 1;
    if (nextQuestion < questionsData.length) {
      setCurrentQuesIndex(nextQuestion);
    } else {
      // showResult(true);  // You need to implement the logic to show the result
    }

    if (isOptionClicked) {
      setIsOptionClicked(false);
    } else {
      setSkippedScore(skippedScore + 1);
    }

    setSelectedOption('');
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleContinue = () => {
    // Logic to handle exam submission
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

      <Dialog open={openDialog} onClose={handleCloseDialog} >
        <DialogTitle>
          <Box sx={{display:"flex", flexDirection:"column", alignItems: 'center', gap: 1,justifyContent:"center" }}>
            <WarningIcon fontSize='large' color="error" />
            <Typography variant="h6" color="error">Warning</Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to submit the exam?</Typography>
        </DialogContent>
        <DialogActions >
          <Link to={'/'} style={{width:"100%"}}>
          <Button  variant="contained" color="primary" sx={{width:"100%"}}>Continue</Button>
          </Link>
           </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Test;
