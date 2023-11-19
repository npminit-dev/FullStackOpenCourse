import { Dispatch, SetStateAction } from "react"

export type SessionProps = {
  user: User|null,
  setuser: Dispatch<SetStateAction<User|null>>,
  token: Token|null,
  settoken: Dispatch<SetStateAction<Token|null>>,
  setmsg: Dispatch<SetStateAction<string|null>>
}

export type LoginProps = {
  token: Token|null,
  settoken: Dispatch<SetStateAction<Token|null>>,
  setmsg: Dispatch<SetStateAction<string|null>>
}

export type User = {
  name: string,
  username: string,
}

export type LoginBasicData = {
  username: string,
  password: string
}

export type Token = string

export type BlogProps = {
  blogs: Array<Blog>
}

export type Blog = {
  title: string,
  url: string,
  likes: number
}

export type PostBlogProps = {
  token: string
  setblogs: Dispatch<SetStateAction<Blog[]>>,
  setmsg: Dispatch<SetStateAction<string|null>>
}

export type MessageProps = {
  msg: string|null
  setmsg: Dispatch<SetStateAction<string|null>>
}