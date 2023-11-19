import { useEffect, useState } from 'react'
import './App.css'
import Session from './components/session/Session';
import { Blog, Token, User } from './types/types';
import Blogs from './components/Blogs';
import { get_Blogs } from './utils/userRequests';
import UserInfo from './components/session/UserInfo';
import PostBlog from './components/PostBlog';
import Messages from './components/Messages';

function App() {

  const [user, setuser] = useState<User|null>(null);
  const [token, settoken] = useState<Token|null>(null);
  const [msg, setmsg] = useState<string|null>(null);
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
    { msg && <Messages msg={msg} setmsg={setmsg}></Messages> }
    {
      !token || !user ?
      <Session {...{ user, setuser, token, settoken, setmsg }}></Session> :
      <>
        <UserInfo {...user}></UserInfo>
        <PostBlog {...{user, setblogs, setmsg, token}}></PostBlog>
      </>
    }
    <Blogs blogs={blogs}></Blogs>
  </div>
}

export default App
