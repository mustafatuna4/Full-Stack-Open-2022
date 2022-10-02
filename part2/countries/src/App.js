import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Countries from './components/Countries'
const App = () => {
  const [countries, setCountries] = useState([])

  const [search, setNewSearch] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all').then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleNewSearch = (event) => {
    const search = event.target.value
    setNewSearch(search)
    if (search === "") {
      setNewFilter("")
    }
    else {
      const newArr = (countries.filter(x => x.name.common.toLowerCase().includes(search)))
      setNewFilter(newArr)
    }
  }

  return (
    <div>
      <Filter value={search} onChange={handleNewSearch}></Filter>
      {filter !== "" ? ((filter.length <= 10) ? <Countries filteredCountries={filter}></Countries> : <p>too many results</p>) : <p>enter new search</p>}
    </div>
  )
}

export default App
