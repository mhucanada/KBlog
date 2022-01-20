import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  Button,
  createTheme,
  ThemeProvider,
  Container, //eslint-disable-line no-unused-vars
  CssBaseline,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  Box,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const theme = createTheme()

const MainPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (window.localStorage.getItem('loggedTaskappUser')) {
      navigate('/homepage')
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              KBlog
            </Typography>
            <Button variant="contained" sx={{ margin: 1 }} component={Link} to={'/loginpage'}>
              LOG IN
            </Button>
            <Button variant="contained" sx={{ margin: 1 }} component={Link} to={'/createaccount'}>
              SIGN UP
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  )
}

export default MainPage
