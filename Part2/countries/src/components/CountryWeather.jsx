import React, { useState, useEffect } from 'react';
import axios from 'axios'

const CountryWeather = ({ name }) => {

  const [data, setdata] = useState(null);

  useEffect(() => {
    if(name) {
      console.log(process.env.REACT_APP_WEATHER_API_KEY);
      axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${name}`)
        .then(res => console.log(res.data)) // i'm only writing on console for now
    }
  }, [name])

  return ( 
    <>

    </>
  );
}
 
export default CountryWeather;