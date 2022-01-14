const commentRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

commentRouter.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate('user', { username: 1, name: 1 })

  response.json(comments)
  /* Comment.find({}).then((comments) => {
    response.json(comments.map((comment) => comment.toJSON()))
  }) */
})

commentRouter.post('/', async (request, response) => {
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

  const comment = new Comment({
    content: body.content,
    date: body.date,
    user: user._id,
  })

  const savedComment = await comment.save()

  /* concats the comment id to the comments array in the user */
  user.comments = user.comments.concat(savedComment._id)
  await user.save()
  response.json(savedComment.toJSON())
})

commentRouter.put('/:id', (request, response) => {
  const { body } = request

  const comment = {
    content: body.content,
    category: body.category,
    date: body.date,
  }

  Comment.findByIdAndUpdate(request.params.id, comment, { new: true }).then((updatedComment) => {
    response.json(updatedComment.toJSON())
  })
})

commentRouter.delete('/:id', (request, response, next) => {
  Comment.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
  // eslint-disable-next-line no-undef
    .catch((error) => next(error))
})

module.exports = commentRouter
