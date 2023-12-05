import { jwtDecode } from "jwt-decode";
import { User } from "../types/types";

export const decodeJWT = (token: string): User | Error => {
  try {
    let data = jwtDecode(token) as User;
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getRandomCat = (size: number) =>
  `https://robohash.org/${Math.round(
    Math.random() * 1000
  )}/?set=set4&size=${size}x${size}`;
