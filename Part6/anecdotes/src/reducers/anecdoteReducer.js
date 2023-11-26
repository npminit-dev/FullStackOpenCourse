import { createSlice } from '@reduxjs/toolkit'
import { createAnecdote, getAll, voteAnecdoteReq } from '../utils/requests'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: Math.round(Math.random() * 10)
  }
}

const anecdotesReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAll: (state, action) => {
      return action.payload
    },
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
  initialState: { msg: 'default message', delay: 3 },
  reducers: {
    setmsg(state, action) {
      return { msg: action.payload.msg, delay: action.payload.delay }
    }
  }
})

export function initializeAsync() {
  return async function(dispatch, setState) {
    let res = await getAll()
    dispatch(setAll(res))
  }
}

export function addAsync(content) {
  return async function(dispatch, getState) {
    let res = await createAnecdote(content)
    if(res instanceof Error) dispatch(setmsg({msg: 'Error adding new anecdote!', delay: 5}))
    else {
      dispatch(addAnecdote(content))
      dispatch(setmsg({msg: 'Anecdote added!', delay: 2}))
    }
  }
}

export function voteAsync(id, votes) {
  return async function(dispatch, getState) {
    let res = await voteAnecdoteReq(id, votes)
    if(res instanceof Error) dispatch(setmsg({msg: `Error upvoting ${id} anecdote`, delay: 5}))
    else {
      dispatch(voteAnecdote(id))
      dispatch(setmsg({msg: `You upvoted the id: ${id} post!`, delay: 2}))
      dispatch(orderByVotes())
    }
  }
}

export default  { 
  anecdotesRedcr: anecdotesReducer.reducer,
  filterRedcr: filterReducer.reducer,
  notificationRedcr: notificationReducer.reducer
}

export const {  setAll, addAnecdote, orderByVotes, voteAnecdote } = anecdotesReducer.actions
export const { changeFilter } = filterReducer.actions
export const { setmsg } = notificationReducer.actions


