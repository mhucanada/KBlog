const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const taskSchema = new mongoose.Schema({
  title: String,
  content: String,
  status: Boolean,
  category: String,
  date: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Task', taskSchema)
