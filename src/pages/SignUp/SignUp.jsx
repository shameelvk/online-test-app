import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import LoginIcon from "../../assets/images/logo.png";
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const route = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      handleSignUp();
    } else {
      setFormErrors(errors);
    }
  };

  const handleSignUp = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = existingUsers.find(user => user.email === formData.email);

    if (existingUser) {
      setFormErrors({ email: 'Email already exists. Please use a different email.' });
      setIsSubmitting(false);
    } else {
      existingUsers.push(formData);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      setIsSubmitting(false);
      route('/');
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: "url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGElMjBtYW4lMjB3aXRoJTIwbGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60')",
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
          marginY: { xs: 10 }
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
          <Typography variant="h4" component="h3" gutterBottom fontWeight={'bold'} >
            User Sign Up
          </Typography>
          <TextField
            label="Email"
            name="email"
            variant="standard"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="standard"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Already have an account? <Link to="/" style={{ fontWeight: 'bold', color: "black", textDecoration: "none" }}>Login</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SignUp;
