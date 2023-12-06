import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import { UserAndBlogs } from "../../types/types";
import { Dimmer, Loader, Segment, Image, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, getUsersBlogsAsync } from "../../reduxstate/store";
import { appContext } from "../contexts/AppContextProvider";

const Users = () => {
  const [loading, setloading] = useState<boolean>(true);
  const userblogs = useSelector<any>((data) => data.userblogs) as [];
  const dispatch = useDispatch<AppDispatch>();
  const { settabindex } = useContext(appContext)

  useEffect(() => {
    settabindex(1)
    setloading(true);
    dispatch(getUsersBlogsAsync())
      .then(() => setloading(false))
      .catch(() => setloading(false));
  }, []);

  const getAvgLikes = (blogs: UserAndBlogs["blogs"]): number => {
    if(!blogs.length) return 0
    return (
      blogs.reduce((acc, curr) => {
        acc += curr.likes;
        return acc;
      }, 0) / blogs.length
    );
  };

  const getRank = (usersAndBlogs: UserAndBlogs[], username: string) => {
    let auxList = usersAndBlogs?.toSorted((a, b) => {
      let likesA = a.blogs.reduce((acc, curr) => (acc += curr.likes), 0);
      let likesB = b.blogs.reduce((acc, curr) => (acc += curr.likes), 0);
      if (likesA > likesB) return -1;
      else return 1;
    });
    let idx = auxList?.findIndex((elem) => elem.username === username);
    return idx + 1;
  };

  return (
    <>
      {loading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader>Fetching users...</Loader>
          </Dimmer>
          <Image
            src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png"
            className="placeholder"
          />
        </Segment>
      ) : (
        <Table color="red">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Blogs created</Table.HeaderCell>
              <Table.HeaderCell>Average Likes</Table.HeaderCell>
              <Table.HeaderCell>Rank</Table.HeaderCell>
              <Table.HeaderCell>Blogs</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {userblogs.map((userblog: UserAndBlogs, i) => (
              <Table.Row key={v4()}>
                <Table.Cell>{userblog.username}</Table.Cell>
                <Table.Cell>{userblog.name}</Table.Cell>
                <Table.Cell>{userblog.blogs.length}</Table.Cell>
                <Table.Cell>
                  {getAvgLikes(userblog.blogs).toFixed(2)}
                </Table.Cell>
                <Table.Cell>
                  #{getRank(userblogs, userblog.username)}
                </Table.Cell>
                <Table.Cell
                  children={
                    <Link
                      className="link-without-blue"
                      key={v4()}
                      to={"/user"}
                      state={{ ...userblog }}
                    >
                      <strong>
                        <u>Bloglist</u>
                      </strong>
                    </Link>
                  }
                />
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default Users;
