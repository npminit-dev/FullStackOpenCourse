import React, { useState, useEffect } from 'react';
import CountryDetails from './CountryDetails';

const CountryList = ({ countryList, inputmessage }) => {

  const [details, setdetails] = useState(null);

  useEffect(() => {
    if(Array.isArray(countryList) && countryList.length === 1) setdetails(countryList[0])
  }, [countryList]);

  useEffect(() => {
    console.log(details);
  }, [details]);

  return (     
    <>
      <ul>
      { 
        countryList && countryList.length ? 
        countryList.map(country => 
          <div key={country.name}>
            <li>{ country.name }</li>
            <button onClick={() => setdetails({...country})}>DETAILS</button>
          </div>
        ) : <p><i>Info: { inputmessage }</i></p>
      }
      </ul>
      {
        details ? 
        <CountryDetails { ...details }></CountryDetails> :
        <></>
      }
    </>
  );
}
 
export default CountryList;