import axios from 'axios'
import React, { useState } from 'react';

const Search = ({ setCountryList, setInputMessage }) => {
  const [inputvalue, setinputvalue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!inputvalue.length) {
      setCountryList([])
      setInputMessage('Input empty, write something in there')
    }
    else axios(`https://restcountries.com/v3.1/name/${inputvalue}?fields=name,capital,languages,population,flags`)
      .then(countries => {
        if(countries.data.length > 9) {
          setCountryList([])
          setInputMessage('Too much matches, be more specific')
        } 
        else setCountryList(countries.data.map(country => {
          return { 
            name: country.name.official, 
            capital: country.capital.join(', '),
            langs: Object.values(country.languages).join(', '),
            population: country.population,
            flag: country.flags.svg,
            alt: country.flags.alt
          }
        }))
      })
      .catch(err => {
        if(err.response?.statusText === 'Not Found') {
          setCountryList([])
          setInputMessage('No matches')
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search by name: <br></br>
        <input
          maxLength={60}
          pattern="[A-Za-záéíóúÁÉÍÓÚ ]{0,60}"
          placeholder="Brazil, Australia, Germany..."
          value={inputvalue}
          onChange={(e) => setinputvalue(e.target.value)}
        ></input>
      </label>
      <button type="submit">SEARCH</button>
    </form>
  );
};

export default Search;
