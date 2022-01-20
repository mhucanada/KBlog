import React, { useState } from 'react'
import { Snackbar, Alert } from '@mui/material'




const SnackbarAlert = ({
  alertOpen
}) => {
  const [openAlert, setOpenAlert] = useState(false) // eslint-disable-line no-unused-vars

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: ' bottom', horizontal: 'center' }}
      open={alertOpen}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <Alert onClose={handleCloseAlert} severity="success">
        Created new post!
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert
