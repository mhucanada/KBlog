require('dotenv').config()
const express = require('express')
const app = express()
const Task = require('./models/task')
const Category = require('./models/category')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.get('/api/tasks', (request, response) => {
	Task.find({}).then((tasks) => {
		response.json(tasks.map((task) => task.toJSON()))
	})
})

app.get('/api/categories', (request, response) => {
	Category.find({}).then((categories) => {
		response.json(categories.map((category) => category.toJSON()))
	})
})

app.post('/api/tasks', (request, response) => {
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

app.post('/api/categories', (request, response) => {
	const body = request.body

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

app.put('/api/tasks/:id', (request, response) => {
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

app.delete('/api/tasks/:id', (request, response) => {
	Task.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		// eslint-disable-next-line no-undef
		.catch((error) => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
