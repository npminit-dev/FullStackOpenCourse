import { BlogsProps } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import Blog from "./Blog";
import PropTypes from "prop-types";
import { useState } from "react";

const Blogs = ({ blogs, token, setmsg, setblogs, user }: BlogsProps) => {

  const [order, setorder] = useState<'asc'|'desc'>('asc');

  const handleClickSort = () => {
    setblogs(blogs => {
      let sorted =  blogs.toSorted((a, b) => {
        if(a.likes > b.likes) return -1 
        else return 1
      })
      if(order === 'desc') return sorted.toReversed() 
      return sorted
    })
    setorder(order === 'asc' ? 'desc' : 'asc')
  }

  return (
    <section>
      <hr></hr>
      <label>
      Order:
        <button
          onClick={handleClickSort}
          id="sortblogsbutton"
          title="sort by likes button"
          type="button"
        >{ order.toString().toUpperCase() }
        </button>
      </label>
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
  user: PropTypes.object,
};

export default Blogs;
