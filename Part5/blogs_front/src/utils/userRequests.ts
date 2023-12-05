import axios, { AxiosResponse } from 'axios'
import { BlogProps, LoginBasicData, SignInBasicData } from '../types/types'

export const BASE_URL = 'http://localhost:3003'

export const log_in = async ({ username, password }: LoginBasicData): Promise<AxiosResponse|any> => {
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

export const sign_in = async (data: SignInBasicData): Promise<AxiosResponse|any> => {
  try {
    let requestObj = await axios({
      method: 'POST',
      url: `${BASE_URL}/api/users/signin`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    })
    return requestObj.data
  } catch(err) {
    return err
  }
}

export const get_Blogs = () => {
  return axios.get(`${BASE_URL}/api/mix/blogs`)
}

export const post_Blog = async (token: string, blog: Partial<BlogProps>) => {
  return axios.post(`${BASE_URL}/api/blogs`, 
  { 
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `bearer: ${token}`
  }, 
    data: JSON.stringify(blog)
  })
}

export const like_Blog = async (token: string, id: string, likes: number): Promise<AxiosResponse|any> => {
  try {
    let requestObj = await axios.patch(`${BASE_URL}/api/blogs/setlikes/${id}?likes=${likes}`, 
    {
      headers: {
        "Authorization": `bearer: ${token}`
      }
    })
    return requestObj
  } catch(err) {
    return err
  }
}

export const remove_Blog = async (token: string, blogID: string): Promise<AxiosResponse|any> => {
  try {
    let requestObj = axios.delete(`${BASE_URL}/api/blogs/${blogID}`, {
      headers: {
        "Authorization": `bearer: ${token}`
      }
    })
    return requestObj
  } catch(err) {
    return err
  }
}

export const comment_Blog = async (comment: string, id: string): Promise<AxiosResponse|any> => {
  try {
    let requestObj = await axios({
      method: 'POST',
      url: `${BASE_URL}/api/blogs/comment/${id}`,
      headers: {
        "Content-Type": 'application/json'
      },
      data: {
        commentBody: comment 
      }
    })
    return requestObj
  } catch(err) {
    return err
  }
}

export const get_User_Blogs = async (): Promise<AxiosResponse|any> => {
  try {
    let requestObj = await axios.get(`${BASE_URL}/api/users/blogs`)
    return requestObj
  } catch(err) {
    return err
  }
}