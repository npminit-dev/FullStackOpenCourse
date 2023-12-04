import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { appContext } from "../contexts/AppContextProvider";
import {
  AppDispatch,
  getAllBlogsAsync,
  setBlogs,
} from "../../reduxstate/store";
import { Link } from "react-router-dom";
import PostBlog from "../PostBlog";
import { BlogProps } from "../../types/types";
import { Button, Divider, Icon, List } from "semantic-ui-react";
import { useDispatch } from "react-redux";

const Blogs = () => {
  const [order, setorder] = useState<"asc" | "desc">("asc");
  const [loading, setloading] = useState<boolean>(false);
  const { blogs, user } = useContext(appContext);
  const dispatch = useDispatch<AppDispatch>();

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
      <Divider horizontal>
        <span>{"<bloglist/>"}</span>
      </Divider>
      <div className="low-margin-container">
        <Button
          compact
          circular
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
          circular
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
      <List
        size="big"
        divided
        animated={true}
        className="low-padding-container"
      >
        {blogs.map((blog) => (
          <List.Item key={uuidv4()}>
            <List.Icon name="newspaper outline"></List.Icon>
            <List.Content>
              <Link to={`/blog/${blog.id}`} className="link-without-blue">
                {blog.title} - <i>{blog.author.username}</i>
                <br></br>
                <span className="medium-font secondary-font">
                  Likes: {blog.likes} - Comments: {blog.comments.length}
                </span>
              </Link>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </section>
  );
};

export default Blogs;
