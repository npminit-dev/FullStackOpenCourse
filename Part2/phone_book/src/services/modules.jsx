import axios from 'axios';

const prefix = '/api/';

export const getAllPersons = () => {
  const req = axios.get(`${prefix}persons`);
  return req.then((req) => req.data);
};

export const addPerson = (person) => {
  const req = axios.post(`${prefix}persons`, person);
  return req.then((response) => response.data);
};

export const deletePerson = (id) => {
  const req = axios.delete(`${prefix}persons`, {data: {id}, headers: {'Content-Type': 'application/json'}});
  return req.then((response) => response.data);
};

export const modifyPerson = (name, number, persons) => {
  const id = persons.find((per) => per.name === name).id;
  console.log(name, number, id);
  const req = axios.put(`http://localhost:3001/api/persons`, {data: {id, newnumber: number}, headers: {'Content-Type': 'application/json'}});
  return req.then((persons) => persons.data);
};
