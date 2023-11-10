import axios from 'axios'

export const getAllPersons = () => {
  let req = axios.get(`http://localhost:3001/persons`)
  return req.then(req => req.data)
}

export const addPerson = (person) => {
  let req = axios.post(`http://localhost:3001/persons`, person)
  return req.then(response => response.data)
}

export const deletePerson = (id) => {
  let req = axios.delete(`http://localhost:3001/persons/${id}`)
  return req.then(response => response.data)
}

export const modifyPerson = (persons, person) => {
  let id = persons.find(per => per.name === person.name).id
  let req = axios.patch(`http://localhost:3001/persons/${id}`, { "number": person.number })
  return req.then(persons => persons.data)
}