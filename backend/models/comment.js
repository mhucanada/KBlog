const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const commentSchema = new mongoose.Schema({
  // title: String,
  content: String,
  date: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  },
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Comment', commentSchema)
