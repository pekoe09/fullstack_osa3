const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())

app.use(express.static('build'))

app.use(bodyParser.json())

morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

app.get('/info', (req, res) => {
  Person
    .count({})
    .then(result => {
      res.send(`<p>puhelinluettelossa ${result} henkilön tiedot</p><p>${new Date()}</p>`)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'could not get the person count' })
    })
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(Person.format))
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'persons could not be retrieved' })
    })
})

app.post('/api/persons', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'name missing' })
  }
  if (!req.body.number) {
    return res.status(400).json({ error: 'number missing' })
  }
  Person
    .find({ name: req.body.name })
    .then(match => {
      console.log("matchit: ", match)
      if (match.length === 0) {
        const person = new Person({
          name: req.body.name,
          number: req.body.number
        })
        person
          .save()
          .then(result => {
            res.json(Person.format(person))
          })
          .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'person could not be saved' })
          })
      } else {
        res.status(400).json({ error: 'person already exists' })
      }
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      res.json(Person.format(person))
    })
    .catch(error => {
      console.log(error)
      res.status(404).end()
    })
})

app.put('/api/persons/:id', (req, res) => {
  const person = req.body
  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(Person.format(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      res.status(400).send({ error: 'malformatted id' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})