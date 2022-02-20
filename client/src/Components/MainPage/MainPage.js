import React from 'react';
//import './MainPage.css';
import { useNavigate } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { Button, Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {observable} from 'mobx';

import {BrowserRouter as Router, Route} from "react-router-dom"
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Mainpage() {



  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
    loginState: 'false',
  });



  const handleNameChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (prop) => {
      //console.log(prop);
      if(prop == true){
        //console.log("hi");
        setValues({
             ...values,
             loginState: 'true',
        });
      }
      else{
        setValues({
        ...values,
        loginState: 'false',
        });
      }
    };


  let navigate = useNavigate();

  function routeChange(){
    let path = '/';
    axios.get("http://localhost:8080/demo/login/"+values.username+"/"+values.password)
         .then((res) =>{
            handleLogin(res.data)
         });
    console.log(values.loginState);
    if(values.loginState == 'true'){
      alert('Success');
      path = '/User?id='+values.username;
      handleLogin('false');
      }
      else{
        alert('Incorrect');
      }
    navigate(path);
  }


  return (
    <Container maxWidth="sm" className="MainPage">
      <Paper>
        <Typography variant="h4" component="h1" gutterBottom align='center'>
          Login
        </Typography>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <TextField 
        label="Username"
        id="Username"
        variant="outlined"
        required
        value = {values.username}
        onChange={handleNameChange('username')}/>
        </FormControl>


        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button variant="contained" color="primary" onClick = {routeChange}>
          Login
        </Button>
      </Paper>
    </Container>
  );
}

