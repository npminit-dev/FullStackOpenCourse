import { Action, AsyncThunkAction } from "@reduxjs/toolkit"
import { Dispatch, SetStateAction } from "react"

export type SessionProps = {
  user: User&{token: string},
}

export type LoginProps = {
  user: User&{token: string}
}

export type ToggleProps = {
  showtext: string,
  hidetext: string,
  shown: boolean,
  parentId?: string
}

export type User = {
  name: string,
  username: string,
}

export type UserAndBlogs = {
  name: string,
  username: string,
  blogs: Array<{
    author: string,
    title: string,
    url: string,
    likes: number
  }>
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
  blogs: Array<BlogProps>,
  token: string|null,
  setmsg: Dispatch<SetStateAction<Message|null>>,
  user: User|null
}

export type BlogProps = {
  id: string
  title: string,
  url: string,
  likes: number,
  comments: Array<string>,
  author: {
    username: string
  },
  setmsg?: Dispatch<SetStateAction<Message|null>>,
  token?: string|null,
  user?: User|null,
  toggleStatus: boolean
}

export type PostBlogProps = {
  user: User,
  token: string,
  setmsg: Dispatch<SetStateAction<Message|null>>
}

export type MessageProps = {
  msg: Message|null
}

export type StoreProps = {
  blogs: BlogProps[],
  user: User&{token: string}
}

export type CommentType = {
  comment: string, 
  id: string
}

// store types: 

export type postAsyncType = {
  token: string, 
  blog: Partial<BlogProps>
}

export type likePostAsyncType = {
  token: string, 
  id: string,
  likes: number
}

export type removeBlogsAsyncType = {
  token: string, 
  id: string
}

// context

export type AppContextType = {
  msg: Message|null,
  setmsg: Dispatch<SetStateAction<Message|null>>,
  dispatch: Dispatch<AsyncThunkAction<any, any, any>|Action<any>>,
  blogs: BlogProps[],
  user: User&{token:string},
}