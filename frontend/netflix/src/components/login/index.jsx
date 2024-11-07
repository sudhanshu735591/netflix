import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { json, useNavigate } from 'react-router-dom';
import UserContext from '../contextapi/usercontext';

const Login = () => {
  const {setFlag} = useContext(UserContext);
  const [data, setData] = useState({
    username:"", 
    password:""
  })
  const navigate = useNavigate();
  const {setLoginId} = useContext(UserContext)
  function handleChange (e){
    const {name, value} = e.target;
    setData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  const postData = async()=>{
    const myData = await fetch("http://localhost:5000/login",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const res = await myData.json();
    if(res?.message==="Logged in successfully"){
      navigate("/home")
      setFlag(true);
      setLoginId(res?.data?._id);
      localStorage.setItem("userId",JSON.stringify(res?.data?._id))
    }
    else{
      alert("Invalid credentials")
      setFlag(false);
      setLoginId("");
    }
  }
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
          Log In
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
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={postData}
          sx={{ fontWeight: 'bold', paddingY: 1.5 }}
        >
          Log In
        </Button>
        <Typography sx={{color:"white"}}>Don't have an account <span style={{color:"blue", cursor:"pointer"}} onClick={()=>navigate("/")}>Sign up</span></Typography>
      </Box>
    </Box>
  );
};

export default Login;
