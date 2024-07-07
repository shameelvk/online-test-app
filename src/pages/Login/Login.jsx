import React, { useState } from 'react';
import { TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Grid, Paper } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from "../../assets/images/logo.png";

function Login() {
    const initialValue = { email: "", password: "", category: "" };
    const [loginValues, setLoginValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
   
    
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginValues({ ...loginValues, [name]: value });
    };
  
    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format";
      }
  
      if (!values.password) {
        errors.password = "Password is required";
      }
  
      if (!values.category) {
        errors.category = "Category is required";
      }
  
      return errors;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const errors = validate(loginValues);
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        handleLogin();
      }
    };
  
    const handleLogin = () => {
      const { email, password } = loginValues;
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const user = existingUsers.find(user => user.email === email && user.password === password);

      if (user) {
        navigate('/test', { state: { category: loginValues.category } });
      } else {
        setFormErrors({ auth: "Invalid credentials" });
      }
    };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: "url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          height: { xs: '50vh', md: '100%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img src={LoginIcon} alt='logo' height={70} />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingX: { md: 10 },
          marginY: { xs: 10, }
        }}
      >
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#FFFFFF",
            width: { xs: '90%', md: '412px' },
            height: { xs: 'auto', md: 'auto' },
            padding: "3rem",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h3"  fontWeight={'bold'}>
            User Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              variant="standard"
              fullWidth
              margin="normal"
              value={loginValues.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="standard"
              fullWidth
              margin="normal"
              value={loginValues.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
            <FormControl fullWidth margin="normal" error={!!formErrors.category}>
              <InputLabel id="category-select-label">Select Subject</InputLabel>
              <Select
                labelId="category-select-label"
                name="category"
                value={loginValues.category}
                onChange={handleChange}
                label="Select Subject"
              >
                <MenuItem value="sports">Sports</MenuItem>
                <MenuItem value="arts">Arts</MenuItem>
                <MenuItem value="history">History</MenuItem>
                <MenuItem value="physics">Physics</MenuItem>
                <MenuItem value="science">Science</MenuItem>
              </Select>
              <Typography variant="caption" color="error">{formErrors.category}</Typography>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              type="submit"
            >
              Login
            </Button>
            {formErrors.auth && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {formErrors.auth}
              </Typography>
            )}
          </form>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Not Created Account Yet? <Link to="/signup" style={{ fontWeight: 'bold', color: "black", textDecoration: "none" }}>Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
