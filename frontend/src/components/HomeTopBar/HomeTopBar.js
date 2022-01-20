import React from 'react'

import {
  Button,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  Box,
  useScrollTrigger,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const theme = createTheme()

function ElevationScroll(props) {
  const { children } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const LandingPage = ({ username, handleLogOut }) => {
  return (
    !username && (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }} position="sticky">
          <ElevationScroll>
            <AppBar>
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
                  Welcome {username}
                </Typography>
                <Button variant="contained" onClick={handleLogOut}>
                  Log Out
                </Button>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
          <Toolbar />
        </Box>
      </ThemeProvider>
    )
  )
}

export default LandingPage
