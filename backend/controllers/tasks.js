const taskRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Task = require('../models/task')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

taskRouter.get('/', async (request, response) => {
  const tasks = await Task.find({}).populate('user', { username: 1, name: 1 }).populate('comment', { content: 1, date: 1 })

  response.json(tasks)
  /* Task.find({}).then((tasks) => {
    response.json(tasks.map((task) => task.toJSON()))
  }) */
})

taskRouter.post('/', async (request, response) => {
  const { body } = request

  const token = getTokenFrom(request)
  // separates the token from the header, object will contain username
  // and id of the person making req
  const decodedToken = jwt.verify(token, process.env.SECRET)
  // if the token is undefined, then the user is not signed in and there is an error
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  /* const user = await User.findById(body.userId) */
  const user = await User.findById(decodedToken.id)

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const task = new Task({
    title: body.title,
    content: body.content,
    status: false,
    category: body.category,
    date: body.date,
    user: user._id,
  })

  const savedTask = await task.save()

  /* concats the task id to the tasks array in the user */
  user.tasks = user.tasks.concat(savedTask._id)
  await user.save()
  response.json(savedTask.toJSON())
})

taskRouter.put('/:id', (request, response) => {
  const { body } = request

  const task = {
    content: body.content,
    status: body.status,
    category: body.category,
    date: body.date,
  }

  Task.findByIdAndUpdate(request.params.id, task, { new: true }).then((updatedTask) => {
    response.json(updatedTask.toJSON())
  })
})

taskRouter.delete('/:id', async (request, response, next) => {
  const toDelete = await Task.findById(request.params.id)
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (decodedToken === toDelete.user) {
    Task.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
    // eslint-disable-next-line no-undef
      .catch((error) => next(error))
  } else {
    return response.status(401).json({ error: 'lol' })
  }
})

module.exports = taskRouter
