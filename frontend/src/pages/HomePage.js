import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import LandingPage from './LandingPage'
import TaskList from '../components/TaskList'
import AddButton from '../components/AddButton'
import Notification from '../components/Notification'
import taskService from '../services/tasks'
import commentService from '../services/comments'
import categoryService from '../services/category'
import { ThemeProvider, createTheme, Toolbar, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

const HomePage = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [currentCategories, setCurrentCategories] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    console.log('effect')
    taskService.getAll().then((initialTasks) => {
      setTasks(initialTasks)
    })
  }, [])

  useEffect(() => {
    console.log('categories')
    categoryService.getAll().then((categories) => {
      setCurrentCategories(categories)
      console.log(categories)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTaskappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const decoded = jwtDecode(loggedUserJSON)
      const currentDate = new Date()

      if (decoded.exp * 1000 < currentDate.getTime()) {
        try {
          window.localStorage.removeItem('loggedTaskappUser')
          window.location.reload()
        } catch (e) {
          setErrorMessage('Already logged out')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      } else {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        taskService.setToken(user.token)
        commentService.setToken(user.token)
      }
    }
  }, [])

  const handleLogOut = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedTaskappUser')
    } catch (e) {
      setErrorMessage('Already logged out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    navigate('/loginpage')
  }

  const handleTaskChange = (event) => {
    console.log(event.target.value)
    setNewTask(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value)
  }

  const toggleFinished = (id) => {
    const task = tasks.find((n) => n.id === id)

    const changedTask = { ...task, status: !task.status }

    taskService.update(id, changedTask).then((returnedTask) => {
      setTasks(tasks.map((task) => (task.id !== id ? task : returnedTask)))
    })
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  if (!user) {
    navigate('/loginpage')
  }

  return (
    <ThemeProvider theme={theme}>
      <Notification message={errorMessage} />
      <LandingPage
        username={user ? user.username : ''}
        handleLogOut={handleLogOut}
      />
      <Grid container sx={{ padding: '16px' }}>
        <Grid item sm={2} xs={2}></Grid>
        <Grid item sm={7} xs={10}>
          <TaskList
            display={!!user}
            tasks={tasks}
            toggleFinished={toggleFinished}
            deleteTask={deleteTask}
            newTask={newTask}
            handleTaskChange={handleTaskChange}
            newCategory={newCategory}
            handleCategoryChange={handleCategoryChange}
            currentCategories={currentCategories}
          />
        </Grid>
        <Grid item sm={3}></Grid>
      </Grid>
      {user && <AddButton tasks={tasks} setTasks={setTasks} />}
    </ThemeProvider>
  )
}

export default HomePage
