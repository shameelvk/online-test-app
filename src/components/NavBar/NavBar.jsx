import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useData } from "../../context/TestContext";
import Logo from "../../assets/images/Iconelogo.png";

const Navbar = () => {
  const { category } = useData();
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%">
          <Box sx={{display:{xs:"none",md:"block"}}}><img src={Logo} alt="Logo"  style={{  height: '30px' }} /></Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
            Exam Category: {category}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
