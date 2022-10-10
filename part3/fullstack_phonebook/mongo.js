const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack2022:${password}@cluster0.ahrm1gn.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
    if (process.argv[3]) {
      const person = new Person({
        name: process.argv[3],
        phone: process.argv[4],
      })
      console.log(person,'person saved!')
      return person.save()
    }
    else {
      Person
        .find({})
        .then(persons => {
          console.log(persons)
        })
    }
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
