import { createContext, useState } from 'react'

export const appContext = createContext()

const AppContextProvider = ({ children }) => {
  const [notification, setNotification] = useState({ msg: '' })
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 5,
      id: 2,
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };


  return (
    <appContext.Provider
      value={{
        notification, 
        setNotification,
        anecdotes,
        setAnecdotes,
        addNew,
        vote
      }}
    > { children }
    </appContext.Provider>
  );
}
 
export default AppContextProvider;