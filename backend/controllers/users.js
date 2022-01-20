const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { body } = request

  if (body.username === '' || body.password === '' || body.password !== body.confirmPassword) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  // replaces path in the document with documents from other collections
  const users = await User.find({}).populate('tasks', { content: 1, date: 1 }).populate('comments', { content: 1, date: 1 })
  response.json(users)
})

module.exports = usersRouter
