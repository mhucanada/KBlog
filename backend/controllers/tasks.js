const taskRouter = require('express').Router()
const Task = require('../models/task')

taskRouter.get('/', (request, response) => {
  Task.find({}).then((tasks) => {
    response.json(tasks.map((task) => task.toJSON()))
  })
})


taskRouter.post('/', (request, response) => {
  const body = request.body

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
  })

  task.save()
    .then((savedTask) => savedTask.toJSON())
    .then((savedAndFormattedTask) => {
      response.json(savedAndFormattedTask)
    })
})

taskRouter.put('/:id', (request, response) => {
  const body = request.body

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
