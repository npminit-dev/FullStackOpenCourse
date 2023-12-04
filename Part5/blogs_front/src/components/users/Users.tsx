import axios from "axios";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import { BlogProps, UserAndBlogs } from "../../types/types";
import { Dimmer, Loader, Segment, Image, Table } from "semantic-ui-react";

const Users = () => {
  const [userblogs, setuserblogs] = useState<UserAndBlogs[]|null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3003/api/users/blogs")
      .then((res) => setuserblogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getAvgLikes = (blogs: UserAndBlogs['blogs']): number => {
    return blogs.reduce((acc, curr) => {
      acc += curr.likes
      return acc
    }, 0) / blogs.length
  }

  const getRank = (usersAndBlogs: UserAndBlogs[], username: string) => {
    let auxList = usersAndBlogs?.toSorted((a, b) => {
      let likesA = a.blogs.reduce((acc, curr) => acc += curr.likes, 0)
      let likesB = b.blogs.reduce((acc, curr) => acc += curr.likes, 0)
      if(likesA > likesB) return -1
      else return 1
    })
    let idx = auxList?.findIndex(elem => elem.username === username)
    return idx + 1
  }

  return (
    <>
      {userblogs ? 
      <Table>
        <Table.Header>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Blogs created</Table.HeaderCell>
          <Table.HeaderCell>Average Likes</Table.HeaderCell>
          <Table.HeaderCell>Rank</Table.HeaderCell>
          <Table.HeaderCell>Blogs</Table.HeaderCell>
        </Table.Header>
        <Table.Body>

        </Table.Body>
        {
          userblogs.map((userblog: UserAndBlogs, i) => (
            <Table.Row key={v4()}>
              <Table.Cell>{userblog.username}</Table.Cell>
              <Table.Cell>{userblog.name}</Table.Cell>
              <Table.Cell>{userblog.blogs.length}</Table.Cell>
              <Table.Cell>{getAvgLikes(userblog.blogs)}</Table.Cell>
              <Table.Cell>#{getRank(userblogs, userblog.username)}</Table.Cell>
            </Table.Row>
            // <Link
            //   className="link-without-blue"
            //   key={v4()}
            //   to={"/user"}
            //   state={{ ...userblog }}
            // >
            //   <div>
            //     {userblog.username} - blogs created: {userblog.blogs.length}
            //   </div>
            // </Link>
          ))
        }
      </Table>
 : (
        <Segment>
          <Dimmer active inverted>
            <Loader>Fetching users...</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      )}
    </>
  );
};

export default Users;
