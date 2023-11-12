import React from 'react';
import Person from './Person';

const NumberList = ({list, setPersons, setFiltered, setmessage}) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {list?.map((person) => (
          <Person
            key={person.id}
            id={person.id}
            name={person.name}
            number={person.number}
            setPersons={setPersons}
            setFiltered={setFiltered}
            setmessage={setmessage}
          ></Person>
        ))}
      </ul>
    </>
  );
};

export default NumberList;
