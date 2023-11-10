import { deletePerson } from "../services/modules";

const Person = ({ name, number, id, setPersons, setFiltered, setmessage }) => {

  const handleClick = () => {
    deletePerson(id)
      .then(() => {
        setPersons(persons => persons.filter(person => person.id !== id))
        setFiltered(persons => persons.filter(person => person.id !== id))
        setmessage({ message: '"' + name + '" deleted correctly!', type: 'success' })
      }).catch(() => setmessage({ message: 'error deleting!', type: 'error' }))
  }

  return (
    <>
      <li key={name}>
        <span>
          {name}: <i>{number}</i>
        </span>{' '}
        <button onClick={handleClick}>DELETE</button>
      </li>
    </>
  );
};

export default Person;
