import React from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, YouTube, Instagram } from '@mui/icons-material';
import Logo from "../../assets/images/Iconelogo.png";

const Footer = () => {
  return (
    <Box sx={{ padding: '1rem 0' }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: '0 2rem' ,gap:5}}>
        <Grid item>
          <img src={Logo} alt="Company Logo" style={{ height: '50px' }} />
        </Grid>
        <Grid item>
          <Box>
            <IconButton href="https://www.facebook.com" target="_blank" sx={{ margin: '0 0.5rem', backgroundColor: '#fff', borderRadius: '50%' }}>
              <Facebook />
            </IconButton>
            <IconButton href="https://www.twitter.com" target="_blank" sx={{ margin: '0 0.5rem', backgroundColor: '#fff', borderRadius: '50%' }}>
              <Twitter />
            </IconButton>
            <IconButton href="https://www.youtube.com" target="_blank" sx={{ margin: '0 0.5rem', backgroundColor: '#fff', borderRadius: '50%' }}>
              <YouTube />
            </IconButton>
            <IconButton href="https://www.instagram.com" target="_blank" sx={{ margin: '0 0.5rem', backgroundColor: '#fff', borderRadius: '50%' }}>
              <Instagram />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ padding: '1rem 0', marginTop: '1rem' ,borderTop:1,borderColor:"#EEEEEE"}}>
        <Typography variant="body2" align="center">
          © Copyright Clinical Scholar | Powered by Quinoid Business Solutions
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
