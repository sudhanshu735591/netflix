import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [data, setData] = useState({
    username:"", 
    password:"",
    confirmpassword:""
  });
  const navigate = useNavigate();
  function handleChange (e){
    const {name, value} = e.target;
    setData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  const signUp = async () => {
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      });

      const res = await response.json();
        if (res.token) {
          localStorage.setItem("token", res.token); 
        }
    } 
    catch (error) {
      console.error("An error occurred:", error);
    }
};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_small.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px',
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: 'white', fontWeight: 'bold', marginBottom: 2 }}
        >
          Sign In
        </Typography>
        <TextField
          label="Username"
          name='username'
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2, backgroundColor: 'white' }}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name='password'
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: 2, backgroundColor: 'white' }}
          onChange={handleChange}
        />
         <TextField
          label="Confirm Password"
          name='confirmpassword'
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: 2, backgroundColor: 'white' }}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={signUp}
          sx={{ fontWeight: 'bold', paddingY: 1.5 }}
        >
          Sign up
        </Button>
        <Typography sx={{color:"white"}}>Already account !! <span style={{color:"blue", cursor:"pointer"}} onClick={()=>navigate("/login")}>Log in</span></Typography>
      </Box>
    </Box>
  );
};

export default Signup;
