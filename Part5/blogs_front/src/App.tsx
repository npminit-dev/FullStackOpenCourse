import './App.css'
import React, { useEffect, useState } from 'react'
import type { BlogProps, Message, Token, User } from './types/types'
import Session from './components/session/Session'
import Blogs from './components/Blogs'
import { get_Blogs } from './utils/userRequests'
import UserInfo from './components/session/UserInfo'
import PostBlog from './components/PostBlog'
import Messages from './components/Messages'
import Toggle from './components/Toggle'

function App (): React.ReactNode {
  const [user, setuser] = useState<User | null>(null)
  const [token, settoken] = useState<Token | null>(null)
  const [msg, setmsg] = useState<Message | null>(null)
  const [blogs, setblogs] = useState<BlogProps[]>([])

  useEffect(() => {
    get_Blogs()
      .then(blogs => { setblogs(blogs.data) })
      .catch(err => { setmsg(err) })
  }, [])

  return <div>
    <h2>BLOGS</h2>
    { msg !== null && <Messages msg={msg}></Messages> }
    {
    token === null || user === null
      ? <Toggle showtext='LOGIN'hidetext='CLOSE'shownDefault>
          <Session {...{ user, setuser, token, settoken, setmsg }}/>
        </Toggle>
      : <span>
          <UserInfo {...user}></UserInfo>
          <PostBlog {...{ user, setblogs, setmsg, token }}></PostBlog>
        </span>
    }
    <Blogs {...{ blogs, token, setmsg, setblogs, user }}></Blogs>
  </div>
}

export default App
