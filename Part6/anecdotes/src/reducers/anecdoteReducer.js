
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: Math.round(Math.random() * 10)
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'vote':
      return state.map(note => {
        if(action.payload === note.id) return { ...note, votes: note.votes + 1 }
        return note
      })
    case 'orderByVotes':
      return [...state].sort((a, b) => a.votes < b.votes ? -1 : 1)
    case 'addNote': 
      return state.concat(action.payload)
    default: return state 
  }
}

export const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE_FILTER':
      return action.payload;
    default: return state
  }
}

export default { filterReducer, reducer }

export function voteNote (id) {
  return {
    type: 'vote',
    payload: id
  }
}

export function addNewNote(note) {
  return {
    type: 'addNote',
    payload: asObject(note)
  }
}

export function orderByVotes() { 
  return {
    type: 'orderByVotes' 
  }
}

export function changeFilter(filter) {
  return {
    type: 'CHANGE_FILTER',
    payload: filter
  }
}