import React, { useState, useEffect } from 'react'
import CreateAccount from './CreateAccount'
import Notification from './Notification'
import taskService from '../services/tasks'
import commentService from '../services/comments'
import loginService from '../services/login'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const theme = createTheme()

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (window.localStorage.getItem('loggedTaskappUser')) {
      navigate('/homepage')
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedTaskappUser', JSON.stringify(user))
      taskService.setToken(user.token)
      commentService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/homepage')
    } catch (exception) {
      if (!username) {
        setErrorMessage('Please enter a username')
      } else if (!password) {
        setErrorMessage('Please enter a password')
      } else {
        setErrorMessage('Invalid credentials')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  return (
    <ThemeProvider theme={theme}>
      <Notification message={errorMessage} />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to={'/'}
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
            >
              Cancel
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/createaccount">
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default LoginForm

// import React from 'react'

// const LoginForm = ({
//   handleSubmit,
//   handleUsernameChange,
//   handlePasswordChange,
//   username,
//   password,
// }) => {
//   return (
//     <div>
//       <h2> Login </h2>

//       <form onSubmit={handleSubmit}>
//         <div>
//           username
//           <input
//             value={username}
//             onChange={handleUsernameChange}
//           />
//         </div>
//         <div>
//           password
//           <input
//             type="password"
//             value={password}
//             onChange={handlePasswordChange}
//           />
//         </div>
//         <button type="submit">login</button>
//       </form>
//     </div>
//   )
// }

// export default LoginForm
