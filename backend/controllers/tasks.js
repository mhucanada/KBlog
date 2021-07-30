const taskRouter = require('express').Router()
const Task = require('../models/task')
const User = require('../models/user')

taskRouter.get('/', async (request, response) => {
  const tasks = await Task.find({}).populate('user', { username: 1, name: 1 })

  response.json(tasks)
  /* Task.find({}).then((tasks) => {
    response.json(tasks.map((task) => task.toJSON()))
  }) */
})

taskRouter.post('/', async (request, response) => {
  const { body } = request
  const user = await User.findById(body.userId)

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const task = new Task({
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

  response.json(savedTask.toJSON)
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

taskRouter.delete('/:id', (request, response) => {
  Task.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
  // eslint-disable-next-line no-undef
    .catch((error) => next(error))
})

module.exports = taskRouter
