import { useEffect, useState } from 'react'
import './App.css'
import Session from './components/session/Session';
import { Token, User } from './types/types';

function App() {

  const [user, setuser] = useState<User|null>(null);
  const [token, settoken] = useState<Token|null>(null);
  const [msg, setmsg] = useState<string|null>(null);
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    console.log(user)
    console.log(token)
  }, [user, token]);

  return <div>
    <h2>BLOGS</h2>
    {
      !token || !user ?
      <Session {...{ user, setuser, token, settoken, setmsg }}></Session> :
      <></>
    }
  </div>
}

export default App
