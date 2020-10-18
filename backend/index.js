const express = require('express')
const app = express()
require('dotenv').config()
const Event = require('./models/event')

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build')) 


app.get('/api/events', (request, response) => {
  Event.find({}).then(events => {
    response.json(events)
  })
})

app.post('/api/events', (request, response) => {
  const body = request.body

  if (!body.name === undefined) {
    return response.status(400).json({ error: 'missing values' })
  }

  const event = new Event({
    name: body.name,
    starttime: body.starttime,
    endtime: body.endtime,
    place: body.place,
    place_url: body.place_url,
    url: body.url,
    notes: body.notes,
    apiId: body.apiId
  })

  event.save().then(savedEvent => {
    response.json(savedEvent)
  })
})


app.get('/api/events/:id', (request, response, next) => {
  Event.findById(request.params.id)
    .then(event => {
      if (event) {
        response.json(event)      
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/events/:id', (request, response, next) => {
  Event.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/events/:id', (request, response, next) => {
  const body = request.body

  const event = {
    name: body.name,
    starttime: body.starttime,
    endtime: body.endtime,
    place: body.place,
    place_url: body.place_url,
    url: body.url,
    notes: body.notes,
    apiId: body.apiId
  }

  Event.findByIdAndUpdate(request.params.id, event, { new: true })
    .then(updatedEvent => {
      response.json(updatedEvent)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



  
  
  
  
  

  

