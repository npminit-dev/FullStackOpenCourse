import React, { useState, useEffect } from "react";
import AddNumber from "./components/AddNumber";
import NumberList from "./components/NumberList";
import Filter from "./components/Filter";
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios('http://localhost:3001/persons')
      .then(persons => {
        setPersons(persons.data)
        setFiltered(persons.data)
      })
      .catch(err => console.log(err))
  }, [])

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName))
      alert(`the name "${newName}" already exists!`);
    else
      setPersons((persons) => {
        let newList = [...persons, { name: newName, number: newNumber }];
        setFiltered(newList);
        return newList;
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setList={setFiltered} defaultList={persons || []}></Filter>
      <AddNumber
        {...{
          handleNameChange,
          handleNumberChange,
          handleSubmit,
        }}
      ></AddNumber>
      <NumberList list={filtered}></NumberList>
    </div>
  );
};

export default App;
