import { jwtDecode } from 'jwt-decode'

export const decodeJWT = (token: string) => {
  try {
    let data = jwtDecode(token)
    return data
  } catch(error) {
    return error
  }
}