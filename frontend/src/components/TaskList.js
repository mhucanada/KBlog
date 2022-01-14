import React from 'react'
import Task from './Task'
import Dropdown from './Dropdown'

import {
  Button,
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  Box,
  Stack,
  Item,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { makeStyles } from '@mui/styles'

const theme = createTheme()

const useStyles = makeStyles({
  tasksFrame: {
    m: 1,
  },
  tasksContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
  },
})

const TaskList = ({
  display,
  tasks,
  toggleFinished,
  deleteTask,
}) => {
  const classes = useStyles()
  return (
    display && (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className={classes.tasksFrame}>
          <Container className={classes.tasksContainer} spacing={2}>
            {tasks.map((task, i) => (
              <Task
                key={i}
                task={task}
                toggleFinished={() => toggleFinished(task.id)}
                deleteTask={() => deleteTask(task.id)}
              />
            ))}
          </Container>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            m: 1,
          }}
        >

        </Box>
      </ThemeProvider>
    )
  )
}

export default TaskList
