import CountryList from "./components/CountryList";
import Search from "./components/Search";
import React, { useState, useEffect } from "react";
import './app.css'

function App() {
  const [countryList, setCountryList] = useState([]);
  const [inputmessage, setInputMessage] = useState(
    "List empty, use input to search a country"
  );

  return (
    <>
      <h2>Countries</h2>
      <Search
        setCountryList={setCountryList}
        setInputMessage={setInputMessage}
      ></Search>
      <CountryList
        countryList={countryList}
        inputmessage={inputmessage}
      ></CountryList>
    </>
  );
}

export default App;
