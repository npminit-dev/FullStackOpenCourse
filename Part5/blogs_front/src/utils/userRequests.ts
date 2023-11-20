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
  return axios.get(`${BASE_URL}/api/mix/blogs`)
}

export const post_Blog = (token: string, blog: Partial<Blog>) => {
  return axios.post(`${BASE_URL}/api/blogs`, 
  { 
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `bearer: ${token}`
  }, 
    data: JSON.stringify(blog)
  })
}

export const like_Blog = async (token: string, id: string, likes: number) => {
  try {
    let requestObj = await axios.patch(`${BASE_URL}/api/blogs/setlikes/${id}?likes=${likes}`, {
      headers: {
        "Authorization": `bearer ${token}`
      }
    })
    return requestObj
  } catch(err) {
    return err
  }
}