import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newPerson, setNewPerson] = useState({ name: "", number: "" })
  const [search, setNewSearch] = useState('')
  const [filter, setNewFilter] = useState('')
  const [arrayLength, setArrayLength] = useState('')
  const [update, setUpdateMessage] = useState('')
  const [error, setErrorMessage] = useState('')
  useEffect(() => {
    personService.getAll().then(response => {
      console.log('promise fulfilled')
      setPersons(response)
      setArrayLength(response.length)
    })

  }, [])

  const handlePersonChange = (event) => {
    setNewPerson(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    }
    )
  }
  const Notification = ({ message, type }) => {
    if (message === "") {
      return ""
    }
    if (type === update) {
      return (
        <div className='update'>
          {message}
        </div>
      )
    }
    else {
      return (
        <div className='error'>
          {message}
        </div>
      )
    }

  }
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
    setNewFilter(search !== "" ? persons.filter(x => x.name.toLowerCase().includes(search)) : "")
  }
  const handleDelete = (person) => {
    if ((window.confirm(`Want to delete?`)))
      console.log("delete confirmed")
    else
      return
    const nameObject = {
      name: person.name,
      number: person.number,
      id: person.id,
    }
    personService.erase(nameObject.id).then(returnedPersons => {
      setPersons((persons.filter(item => item.id !== person.id)).map((person) => ({ ...person, id: person.id })))
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    let oldId = arrayLength + 1
    const arr = persons.filter(item => item['name'] === (newPerson.name))
    let duplicate
    arr.length !== 0 ? duplicate = true : duplicate = false
    const nameObject = {
      name: newPerson.name,
      number: newPerson.number,
      id: oldId
    }
    const checkDuplicate = () => {
      if (duplicate) {
        oldId = arr[0].id
        if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
          personService.update(oldId, nameObject).then(returnedPerson => {
            setPersons(prevFormData => prevFormData.map(person => person.id === oldId ? nameObject : person))
          })
            .catch(error => {
              console.log('fail')
              setUpdateMessage("")
              setErrorMessage(`Information of ${newPerson.name} has already been removed from the server`)
              setTimeout(() => { setErrorMessage("") }, 5000)
              return
            }
            )
          setUpdateMessage(`${newPerson.name}'s phone number is updated to ${newPerson.number}`)
          setTimeout(() => { setUpdateMessage("") }, 5000)
        }
      }
      else {
        personService.create(nameObject).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setUpdateMessage(`${newPerson.name} is added to the phonebook`)
          setTimeout(() => { setUpdateMessage("") }, 5000)
        })
        setArrayLength(oldLength => oldLength + 1)
      }
    }
    checkDuplicate()
    setNewPerson({ name: "", number: "" })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      {error !== "" ? <Notification message={error} type={error} /> :""}
      {update !== "" ? <Notification message={update} type={update} /> :""}
      <Filter value={search} onChange={handleNewSearch}></Filter>
      <h2>add a new</h2>
      <PersonForm newPerson={newPerson} addPerson={addPerson} handlePersonChange={handlePersonChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handleDelete={handleDelete}></Persons>
    </div>
  )
}

export default App