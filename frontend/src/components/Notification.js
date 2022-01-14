import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const Notification = ({ message }) => {
  return message === null ? null : (
    <Snackbar open={message} autoHideDuration={3000}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
