
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => { 
    console.log('connected to MongoDB')  
    })  
    .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)  
    })

const eventSchema = new mongoose.Schema({
  name: String,
  url: String,
  place: String,
  starttime: Date,
  endtime: Date,
  place: String,
  place_url: String,
  notes: String,
  apiId: String,
})

eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Event', eventSchema)

