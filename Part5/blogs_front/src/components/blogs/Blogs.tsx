import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../contexts/AppContextProvider";
import {
  AppDispatch,
  getAllBlogsAsync,
  setBlogs,
} from "../../reduxstate/store";
import { Link, Outlet } from "react-router-dom";
import PostBlog from "../PostBlog";
import { BlogProps } from "../../types/types";
import { Button, Dimmer, Icon, List, Loader } from "semantic-ui-react";
import { useDispatch } from "react-redux";

const Blogs = () => {
  const [order, setorder] = useState<"asc" | "desc">("asc");
  const [loading, setloading] = useState<boolean>(false);
  const { blogs, user, settabindex } = useContext(appContext);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    settabindex(0)
    setloading(true)
    dispatch(getAllBlogsAsync())
      .then(() => setloading(false))
  }, []);

  const sortBlogs = (
    blogs: BlogProps[],
    critery: "asc" | "desc"
  ): BlogProps[] => {
    let newBlogs = blogs.toSorted((a, b) => (a.likes < b.likes ? -1 : 1));
    if (critery === "desc") newBlogs = newBlogs.toReversed();
    return newBlogs;
  };

  const handleClickSort = () => {
    dispatch(setBlogs(sortBlogs(blogs, order)));
    setorder((order) => (order === "asc" ? "desc" : "asc"));
  };

  const handleReload = () => {
    setloading(true);
    dispatch(getAllBlogsAsync()).then(() => setloading(false));
  };

  return (
    <section>
      {user.username && user.token ? <PostBlog></PostBlog> : <></>}
      <div className="low-margin-container">
        <Button
          compact
          primary
          onClick={handleClickSort}
          title="Sort by likes"
          size="medium"
          active={false}
        >
          <Button.Content visible>
            <Icon
              name={order === "asc" ? "sort numeric up" : "sort numeric down"}
            ></Icon>
          </Button.Content>
        </Button>
        <Button
          compact
          secondary
          name="refreshBlogs"
          title="Refresh bloglist"
          size="medium"
          loading={loading}
          onClick={() => handleReload()}
        >
          <Button.Content visible>
            <Icon name="refresh"></Icon>
          </Button.Content>
        </Button>
      </div>
      {!loading ? (
        <List size="large" animated={true} className="low-padding-container">
          {blogs.map((blog) => (
            <List.Item key={uuidv4()} className="low-margin-container">
              <List.Icon name="at" color="blue"></List.Icon>
              <List.Content>
                <Link to={`/blog/${blog.id}`} className="link-without-blue">
                  {blog.title} - <i>{blog.author.username}</i>
                  <br></br>
                  <span className="small-font secondary-font">
                    {blog.likes} likes - {blog.comments.length} comments
                  </span>
                </Link>
              </List.Content>
            </List.Item>
          ))}
        </List>
      ) : (
      <div className="centered-content max-widthed">
        <Loader active inline>Re-fetching blogs</Loader>
      </div>

      )}
      <Outlet></Outlet>
    </section>
  );
};

export default Blogs;
