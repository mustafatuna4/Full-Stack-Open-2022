const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')


app.use(cors())
app.use(express.json())
morgan.token('number', req => `,"number": ${JSON.stringify(req.body.number)}}`)
app.use(express.static('build'))
morgan.token('person', req => `,{"name": ${JSON.stringify(req.body.name)}`)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person:number'))
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = ({
    name: body.name,
    number: body.number,
  })

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' }).then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})


app.get('/info', (req, res) => {
  Person.find({}).then(person => {
    res.send(`<p>Phonebook has info for ${person.length} people <br></br> ${new Date()} </p>`)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response) => {

  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') { return response.status(400).json({ error: error.message }) }

  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})