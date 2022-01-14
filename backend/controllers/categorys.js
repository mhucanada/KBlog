const categoryRouter = require('express').Router()
const Category = require('../models/category')

categoryRouter.get('/', (request, response) => {
  Category.find({}).then((categories) => {
    response.json(categories.map((category) => category.toJSON()))
  })
})

categoryRouter.post('/', (request, response) => {
  const { body } = request

  if (body.category === undefined) {
    return response.status(400).json({
      error: 'category missing',
    })
  }

  const category = new Category({
    category: body.category,
  })

  category
    .save()
    .then((savedTask) => savedTask.toJSON())
    .then((savedAndFormattedTask) => {
      response.json(savedAndFormattedTask)
    })
})

module.exports = categoryRouter
