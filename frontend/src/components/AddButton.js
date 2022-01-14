import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import {
  Fab,
  Tooltip,
  Modal,
  Container,
  TextField,
  collapseClasses,
  Button,
  MenuItem,
  AppBar,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import taskService from '../services/tasks'
import categoryService from '../services/category'
import commentService from '../services/comments'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: 20,
    left: 20,
  },
  container: {
    borderRadius: 5,
    width: 500,
    height: 400,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      height: '100vh',
    },
  },
  // form: {
  //   padding: theme.spacing(2),
  // },
  item: {
    marginBottom: theme.spacing(3),
  },
}))

const AddButton = ({ tasks, setTasks }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [newCategory, setNewCategory] = useState('Public')
  const [newTitle, setNewTitle] = useState('')
  const [currentCategories, setCurrentCategories] = useState([])

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  const addTask = (event) => {
    event.preventDefault()

    // const commentObject = {
    //   content: newTask,
    //   id: Math.random(10000000),
    //   date: Date(),
    // }

    // if (!newTask.replace(/\s/g, '').length) {
    //   alert('Please enter valid text.')
    //   setNewTask('')
    // } else if (!newTitle.replace(/\s/g, '').length) {
    //   alert('Please enter a valid title')
    //   setNewTitle('')
    // } else {
    //   commentService.create(commentObject).then((returnedTask) => {
    //     console.log(returnedTask)
    //     setTasks(tasks.concat(returnedTask))
    //     setNewTask('')
    //     setNewCategory('Public')
    //     setNewTitle('')
    //     setOpen(false)
    //     setOpenAlert(true)
    //   })
    // }
    const oneCategory =
      !newCategory.replace(/\s/g, '').length === true
        ? 'uncategorized'
        : newCategory

    const taskObject = {
      title: newTitle,
      content: newTask,
      id: Math.random(10000000),
      status: false,
      category: oneCategory,
      date: Date(),
    }

    const existingCategories = currentCategories.find(
      (result) => result.category === newCategory
    )
    console.log(existingCategories)

    if (existingCategories === undefined && oneCategory !== 'uncategorized') {
      categoryService
        .create({ category: oneCategory })
        .then((returnedCategory) => {
          console.log(returnedCategory)
          setCurrentCategories(currentCategories.concat(returnedCategory))
        })
    }

    if (!newTask.replace(/\s/g, '').length) {
      alert('Please enter valid text.')
      setNewTask('')
    } else if (!newTitle.replace(/\s/g, '').length) {
      alert('Please enter a valid title')
      setNewTitle('')
    } else {
      taskService.create(taskObject).then((returnedTask) => {
        console.log(returnedTask)
        setTasks(tasks.concat(returnedTask))
        setNewTask('')
        setNewCategory('Public')
        setNewTitle('')
        setOpen(false)
        setOpenAlert(true)
      })
    }
  }

  const handleTaskChange = (event) => {
    console.log(event.target.value)
    setNewTask(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value)
  }

  const handleTitleChange = (even) => {
    setNewTitle(even.target.value)
  }

  return (
    <div>
      <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes.modal}
      >
        <Container className={classes.container}>
          <h2>Create a Post</h2>
          <form className={classes.form} autoComplete="off" onSubmit={addTask}>
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                label="Title"
                value={newTitle}
                onChange={handleTitleChange}
                size="small"
                style={{ width: '100%' }}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                defaultValue="Enter text here..."
                onChange={handleTaskChange}
                value={newTask}
                label="Description"
                placeholder="Enter text here..."
                size="small"
                style={{ width: '100%' }}
                variant="outlined"
              />
            </div>
            <div className={classes.item}>
              <TextField
                select
                label="Visibility"
                value={newCategory}
                onChange={handleCategoryChange}
              >
                <MenuItem value="Public"> Public</MenuItem>
                <MenuItem value="Private"> Private</MenuItem>
                <MenuItem value="Unlisted"> Unlisted</MenuItem>
              </TextField>
            </div>
            <div className={classes.item}>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                style={{ marginRight: 20 }}
              >
                Post
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Container>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: ' bottom', horizontal: 'center' }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Created new post!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AddButton
{
  /* <form onSubmit={addTask}>
  <input value={newTask} onChange={handleTaskChange} placeholder=" Task" />
  <input
    type="text"
    value={newCategory}
    onChange={handleCategoryChange}
    placeholder=" Category"
    list="cats"
  />
  <datalist id="cats">
    {currentCategories.map((category, i) => (
      <Dropdown key={i} category={category.category} />
    ))}
  </datalist>

  <input type="submit" value="Add" />
</form>  */
}
