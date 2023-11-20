import { Dispatch, SetStateAction } from "react"

export type SessionProps = {
  user: User|null,
  setuser: Dispatch<SetStateAction<User|null>>,
  token: Token|null,
  settoken: Dispatch<SetStateAction<Token|null>>,
  setmsg: Dispatch<SetStateAction<Message|null>>
}

export type LoginProps = {
  token: Token|null,
  settoken: Dispatch<SetStateAction<Token|null>>,
  setmsg: Dispatch<SetStateAction<Message|null>>
}

export type ToggleProps = {
  showtext: string,
  hidetext: string
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

export type Message = {
  msg: string,
  type: 'info'|'success'|'error'
}

export type BlogsProps = {
  blogs: Array<Blog>
}

export type Blog = {
  id: string
  title: string,
  url: string,
  likes: number,
  author: {
    username: string
  }
}

export type PostBlogProps = {
  user: User,
  token: string
  setblogs: Dispatch<SetStateAction<Blog[]>>,
  setmsg: Dispatch<SetStateAction<Message|null>>
}

export type MessageProps = {
  msg: Message|null
}