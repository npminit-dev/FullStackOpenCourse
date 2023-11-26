import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const addAnecdote = async (anecdote) => {
    await axios.post(`${BASE_URL}/anecdotes`, {...anecdote})
}

export const getAnecdotes = async () => {
  try {
    let res = await axios.get(`${BASE_URL}/anecdotes`)
    return res.data
  } catch(err) {
    console.log(err);
    return []
  }
}

export const upvoteAnecdote = async (data) => {
  let res = await axios.patch(`${BASE_URL}/anecdotes/${data.id}`, { votes: data.votes + 1 })
  return res.data
}