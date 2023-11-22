import { BlogsProps } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import Blog from "./Blog";
import PropTypes from "prop-types";

const Blogs = ({ blogs, token, setmsg, setblogs, user }: BlogsProps) => {

  return (
    <section>
      <hr></hr>
      <div id="blogscontainer">
        {blogs.map((blog) => (
          <span key={uuidv4()}>
            <Blog
              {...blog}
              token={token}
              setblogs={setblogs}
              setmsg={setmsg}
              user={user}
            ></Blog>
          </span>
        ))}
      </div>
    </section>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  token: PropTypes.string,
  setmsg: PropTypes.func.isRequired,
  setblogs: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Blogs;
