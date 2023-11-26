import axios from 'axios'

const BASE_URL = 'http://localhost:3005/anecdotes'

export const getAll = async () => {
  try {
    let res = await axios(BASE_URL)
    return res.data
  } catch(err) {
    console.log(err);
    return []
  }
}

export const createAnecdote = async (content) => {
  try {
    let res = await axios.post(BASE_URL, { 
        content,
        votes: 0
     })
  } catch(err) {
    return err
  }
}

export const voteAnecdoteReq = async (id, votes) => {
  try {
    let res = await axios.patch( BASE_URL + `/${id}` , {
      votes: votes + 1
    })
    return res.data
  } catch(err) {
    return err
  }
}