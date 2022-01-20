import React from 'react'
import { theme } from './theme.js'
import MainPage from './pages/MainPage/MainPage'

import { ThemeProvider } from '@mui/styles'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  )
}

export default App
