import axios from 'axios'
import { LoginBasicData } from '../types/types'

const BASE_URL = 'http://localhost:3003'

export const log_in = ({ username, password }: LoginBasicData) => {
  let requestObj = axios.post(BASE_URL + '/api/users/login', 
    { headers: { "Content-Type": "application/json" }, data: JSON.stringify({ username, password })}
  )
  return requestObj
}