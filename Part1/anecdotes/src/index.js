import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [notes, setNotes] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <h2>Anecdote of the day: </h2>
      <i>"{anecdotes[selected]}".</i>
      { 
        notes[selected] > 0 ?
        <p>Has {notes[selected]} votes.</p> :
        <p>Has no votes</p>
      }
      <Vote setNotes={setNotes} idx={selected}></Vote>
      <Next setSelected={setSelected} max={anecdotes.length}></Next>
      <MaxVoted anecdotes={anecdotes} notes={notes}></MaxVoted>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Vote = ({ setNotes, idx }) => {
  const handleClick = () => {
    setNotes(notes => {
      let newNotes = Array.from(notes)
      newNotes[idx] = newNotes[idx] + 1
      return newNotes
    })
  }
  return <button onClick={ handleClick }>VOTE</button>
}

const Next = ({ setSelected, max }) => {
  const handleClick = () => setSelected(selected => {
    let next;
    do next = Math.floor(Math.random() * max)
    while(next === selected);
    return next
  })
  return <button onClick={ handleClick }>NEXT</button>
}

const MaxVoted = ({ anecdotes, notes }) => (
  <>
    <h2>Anecdote with most votes: </h2>
    <i> "{ anecdotes[notes.findIndex(elem => elem === Math.max(...notes))] }".</i>
  </>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes}/>
  </React.StrictMode>
);

