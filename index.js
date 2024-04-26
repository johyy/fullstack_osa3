const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('post', (request) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body);
    }
})

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :post')

app.use(logger)
app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(
        `Phonebook has info for ${persons.length} people <br> ${date}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateRandomId = () => {
    const max = 1000
    return Math.floor(Math.random() * max)

}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const nameNotUnique = persons.find(person => person.name === body.name)
    if (nameNotUnique) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }


    const person = {
        id: generateRandomId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })