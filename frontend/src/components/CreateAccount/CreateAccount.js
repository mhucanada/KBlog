import React, { useState } from 'react'
import Notification from '../Notification/Notification'
import userService from '../../services/user'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

const CreateAccount = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const handleCreateAccount = async (event) => {
    event.preventDefault()

    try {
      await userService.create({
        username: username,
        name: name,
        password: password,
        confirmPassword: confirmPassword,
      })

      setUsername('')
      setPassword('')
      setConfirmPassword('')
      navigate('/loginpage')

    } catch (exception) {
      if (!username) {
        setErrorMessage('Please enter a username')
      } else if (!password) {
        setErrorMessage('Please enter a password')
      } else if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
          <Typography component="h1" variant="h5">
            Create An Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleCreateAccount}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={name}
              onChange={({ target }) => setName(target.value)}
              autoComplete="name"
              autoFocus
            />

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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Go
            </Button>
            <Button
              component={Link}
              to={'/loginpage'}
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
                <Link to="/loginpage">{'Already have an account? Log In'}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default CreateAccount
