const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person