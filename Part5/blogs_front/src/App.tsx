import { useEffect, useState } from 'react'
import './App.css'
import Session from './components/session/Session';
import { Blog, Message, Token, User } from './types/types';
import Blogs from './components/Blogs';
import { get_Blogs } from './utils/userRequests';
import UserInfo from './components/session/UserInfo';
import PostBlog from './components/PostBlog';
import Messages from './components/Messages';
import Toggle from './components/Toggle';

function App() {

  const [user, setuser] = useState<User|null>(null);
  const [token, settoken] = useState<Token|null>(null);
  const [msg, setmsg] = useState<Message|null>(null);
  const [blogs, setblogs] = useState<Blog[]>([]);

  useEffect(() => {
    get_Blogs()
      .then(blogs => setblogs(blogs.data))
      .catch(err => setmsg(err))
  }, [])

  useEffect(() => {
    console.log(msg)
  }, [msg]);

  return <div>
    <h2>BLOGS</h2>
    { msg && <Messages msg={msg}></Messages> }
    {
      !token || !user ?
      <Toggle showtext='LOGIN' hidetext='CLOSE'>
        <Session {...{ user, setuser, token, settoken, setmsg }}/>
      </Toggle> :
      <span>
        <UserInfo {...user}></UserInfo>
        <PostBlog {...{user, setblogs, setmsg, token}}></PostBlog>
      </span>
    }
    <Blogs blogs={blogs} token={token}></Blogs>
  </div>
}

export default App
