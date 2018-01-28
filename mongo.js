const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

mongoose.connect(MONGO_URI)
mongoose.Promise = global.Promise

if (process.argv.length === 4) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })
  console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
  person
    .save()
    .then(response => {
      mongoose.connection.close()
    })
} else {
  console.log('puhelinluettelo:')
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
    .catch(error => {
      console.log(error)
      mongoose.connections.close()
    })
}