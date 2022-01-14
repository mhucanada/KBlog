import React, { useState } from 'react'
import taskService from '../services/tasks'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Alert, Snackbar } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(5),
  },
}))

const Task = ({ task, toggleFinished, deleteTask }) => {
  const classes = useStyles()
  const [openAlert, setOpenAlert] = useState(false)

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this?')) {
      setOpenAlert(true)
      taskService.deleteTask(task.id)
      deleteTask(task.id)
    }
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        image="https://images.squarespace-cdn.com/content/v1/5f68da90297b94613c756dd6/e0d06859-30f6-4679-997c-a2d688de5629/LXI03898.jpg?format=1500w"
        alt="green iguana"
        raised="true"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={handleDelete}>
          Delete
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="success">
            Deleted post!
          </Alert>
        </Snackbar>
      </CardActions>
    </Card>

  // <div className='tasks'>
  //   {/*<button onClick={toggleFinished}>{label}</button>*/}

  //   <input type='checkbox' checked={checked} id='myCheck' onChange={toggleFinished}></input>
  //   {task.content}
  //   <button onClick={deleteTask} id='deleteButton'>
  // 		x
  //   </button>
  // </div>
  )
}

export default Task
