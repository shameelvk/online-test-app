import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';import { Link } from 'react-router-dom';
;

function ExitDialog({openDialog,handleCloseDialog}) {
  return (
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
  )
}

export default ExitDialog