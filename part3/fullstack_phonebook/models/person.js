const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
  .then(() => { console.log('connected to MongoDB') }).catch((error) => { console.log('error connecting to MongoDB:', error.message) })
const personSchema = new mongoose.Schema({
  name: {
    type: String
    , required: true,
    minlength: 3
  },
  number: {
    type: String
    , required: true,
    validate:[{
      validator: function(v){
        return /^\d{2,3}-\d+$|^\d+$/.test(v)
      },
      msg: 'Incorrect number form' },
    { validator: function (v) {
      return (v.replace(/[^0-9]/g, '').length > 8)
    },
    msg: 'Minimum 8 digit characters required'
    }]

  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)