const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
mongoose.Promise = global.Promise

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.static('format', function (person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person