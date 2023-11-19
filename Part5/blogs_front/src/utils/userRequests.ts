import axios from 'axios'
import { Blog, LoginBasicData } from '../types/types'

const BASE_URL = 'http://localhost:3003'

export const log_in = async ({ username, password }: LoginBasicData) => {
  try {
    let requestObj = await axios.post(`${BASE_URL}/api/users/login`, 
      { 
        headers: { "Content-Type": "application/json" }, 
        data: JSON.stringify({ username, password })
      }
    )
    return requestObj
  } catch(err) {
    return err
  }
}

export const get_Blogs = () => {
  return axios.get(`${BASE_URL}/api/blogs`)
}

export const post_Blog = (token: string, blog: Blog) => {
  return axios.post(`${BASE_URL}/api/blogs`, 
  { 
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `bearer: ${token}`
  }, 
    data: JSON.stringify(blog)
  })
}