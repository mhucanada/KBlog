const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

const app = express()
const taskRouter = require('./controllers/tasks')
const categoryRouter = require('./controllers/categorys')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/logins')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const commentRouter = require('./controllers/comments')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// all middleware, each one will be used whenever there is an api call
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/tasks', taskRouter)
app.use('/api/comments', commentRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
