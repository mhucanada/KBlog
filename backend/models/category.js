const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const categorySchema = new mongoose.Schema({
  category: String,
})

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Category', categorySchema)
