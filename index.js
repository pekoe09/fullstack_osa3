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

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

app.get('/info', (req, res) => {
  res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons)
    })
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  if (!person.name) {
    return res.status(400).json({ error: 'name missing' })
  }
  if (!person.number) {
    return res.status(400).json({ error: 'number missing' })
  }
  const match = persons.find(p => p.name === person.name)
  if (match) {
    return res.status(400).json({ error: 'person already exists' })
  }
  const id = getRandomId()
  person.id = id
  persons = persons.concat(person)
  res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
  const match = persons.find(p => p.id === Number(req.params.id))
  if (match) {
    res.json(match)
  } else {
    res.status(404).end()
  }
})

app.put('/api/persons/:id', (req, res) => {
  const match = persons.find(p => p.id === Number(req.params.id))
  if (match) {
    const newList = persons.filter(p => p.id !== match.id)
    const person = req.body
    person.id = match.id
    persons = newList.concat(person)
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(person => person.id !== Number(req.params.id))
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

getRandomId = () => {
  return Math.floor(Math.random() * (1000000000)) + 4
}