import { jwtDecode } from 'jwt-decode'
import { User } from '../types/types'

export const decodeJWT = (token: string): User|Error => {
  try {
    let data = jwtDecode(token) as User
    return data
  } catch(error: any) {
    return error
  }
}