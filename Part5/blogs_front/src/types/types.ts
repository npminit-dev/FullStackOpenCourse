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

export type contextType = {
  toggleStatus: toggleStatus[],
  dispatchToggleStatus: Dispatch<Action>
}
export type toggleStatus = {
  id: string,
  status: boolean
}
export type State = toggleStatus[];
export type Action =
  | { type: "initialize"; payload: BlogProps[] }
  | { type: "add", payload: string }
  | { type: "remove"; payload: string }
  | { type: "toggle"; payload: string };