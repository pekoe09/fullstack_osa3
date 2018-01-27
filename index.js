const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')


app.use(bodyParser.json())
app.use(morgan('tiny'))

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
  res.json(persons)
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
  if (match && match.number) {
    return res.status(400).json({ error: 'person already has a number' })
  }
  const id = getRandomId()
  person.id = id
  persons = persons.concat(person)
  res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
  let match = persons.find(person =>
    person.id === Number(req.params.id))
  if (match) {
    res.json(match)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(person => person.id !== Number(req.params.id))
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

getRandomId = () => {
  return Math.floor(Math.random() * (1000000000)) + 4
}