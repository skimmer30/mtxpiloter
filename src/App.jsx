import { useState } from 'react'

import './App.css'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';

import logo from './assets/logo.png'

import Piloter from './Piloter.jsx'

function App() {

/*
  return (
    <>
      <h3>MTX Piloter</h3>
      <div>
        <img src={logo} className="logo react" alt="mtxpiloter logo" />
      </div>
    </>
  )
*/

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="a" href="#" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }} >
              MTX Piloter
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <img src={logo} className="logo react" alt="mtxpiloter logo" />
      <Piloter />
    </Box>

  )

}

export default App
