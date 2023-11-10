import React, { useState, useEffect, useRef } from "react";
import AddNumber from "./components/AddNumber";
import NumberList from "./components/NumberList";
import Filter from "./components/Filter";
import Messages from "./components/Messages";
import { getAllPersons, addPerson, modifyPerson } from "./services/modules";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [message, setmessage] = useState({ message: null, type: null })

  const timer = useRef(null);

  useEffect(() => {
    getAllPersons()
      .then(persons => {
      setPersons(persons)
      setFiltered(persons)
    })
  }, [])

  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);

  const handleSubmit = (e) => {
    clearTimeout(timer.current)
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      let toDelete = window.confirm(`the name "${newName}" already exists! do you want to replace the number?`);
      if(toDelete) modifyPerson(persons, { name: newName, number: newNumber })
        .then((person) => {
          let newPerson = { name: person.name, number: newNumber, id: person.id }
          let newList = persons.map((elem) => elem.name === person.name ? newPerson : elem)
          let newFilteredList = filtered.map((elem) => elem.name === person.name ? newPerson : elem)
          setPersons(newList)
          setFiltered(newFilteredList)
          setmessage({ message: '"' + person.name + '" modified correctly!', type: 'success' })
        }).catch(() => setmessage({ message: 'error modifying!', type: 'error' }))
    } else addPerson({ name: newName, number: newNumber })
      .then(person => {
        let newList = persons?.concat(person)
        setPersons(newList)
        setFiltered(newList)
        setmessage({ message: '"' + person.name + '" added correctly!', type: 'success' })
      }).catch(() => setmessage({ message: 'error adding!', type: 'error' }))
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setList={setFiltered} defaultList={persons || []}></Filter>
      <Messages 
        msg={message}
        timer={timer}
      ></Messages>
      <AddNumber
        {...{
          handleNameChange,
          handleNumberChange,
          handleSubmit,
        }}
      ></AddNumber>
      <NumberList 
        list={filtered}
        setPersons={setPersons}
        setFiltered={setFiltered}
        setmessage={setmessage}
      ></NumberList>
    </div>
  );
};

export default App;
