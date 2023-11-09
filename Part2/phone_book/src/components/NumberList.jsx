import React from 'react';

const NumberList = ({ list }) => {

  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {list.map((person) => (
          <li key={person.name}>
            <p>
              {person.name}: <i>{person.number}</i>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NumberList;
