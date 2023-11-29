import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if(name.trim()) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((res) => res.data)
        .then(data => {
          setCountry({
            name: data.name.official,
            capital: data.capital[0],
            population: data.population,
            flag: data.flags.svg,
            flagAlt: data.flags.alt,
            found: true
          })
        })
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>Capital: {country.capital} </div>
      <div>Population: {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.flagAlt}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App