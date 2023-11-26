import { createSlice } from '@reduxjs/toolkit'
import produce from 'immer'

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

const anecdotesReducer = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    voteAnecdote: (state, action) => {
      state.forEach(note => {
        if(action.payload === note.id) note.votes++
        return note
      })
    },
    orderByVotes: (state) => {
     state.sort((a, b) => a.votes < b.votes ? -1 : 1)
    },
    addAnecdote: (state, action) => {
      return [...state, asObject(action.payload)]
    }
  }
})


const filterReducer = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter (state, action) {
      return action.payload
    }
  }
})

const notificationReducer = createSlice({
  name: 'notification',
  initialState: { msg: 'default message' },
  reducers: {
    setmsg(state, action) {
      return { ...state, msg: action.payload }
    }
  }
})

export default  { 
  anecdotesRedcr: anecdotesReducer.reducer,
  filterRedcr: filterReducer.reducer,
  notificationRedcr: notificationReducer.reducer
}

export const { addAnecdote, orderByVotes, voteAnecdote } = anecdotesReducer.actions
export const { changeFilter } = filterReducer.actions
export const { setmsg } = notificationReducer.actions

