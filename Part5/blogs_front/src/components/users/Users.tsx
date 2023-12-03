import axios from "axios";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { Link } from 'react-router-dom'
import { UserAndBlogs } from "../../types/types";

const Users = () => {

  const [userblogs, setuserblogs] = useState<UserAndBlogs[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3003/api/users/blogs')
    .then(res => setuserblogs(res.data))
    .catch(err => console.log(err))
  }, [])

  return ( 
  <>
  <h3>Users</h3>
  {
    userblogs.map((userblog: UserAndBlogs, i) => (
      <Link
        key={v4()}
        to={'/user'}
        state={{...userblog}}
      ><div>{userblog.username} - blogs created: {userblog.blogs.length}</div></Link>
    ))
  }
  </> 
  );
}
 
export default Users;