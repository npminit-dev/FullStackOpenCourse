import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { appContext } from "../contexts/AppContextProvider";
import { getAllBlogsAsync, setBlogs } from "../../reduxstate/store";
import { Link } from "react-router-dom";
import PostBlog from "../PostBlog";
import { BlogProps } from "../../types/types";

const Blogs = () => {

  const [order, setorder] = useState<'asc'|'desc'>('asc');
  const { dispatch, blogs, user } = useContext(appContext)
  
  const sortBlogs = (blogs: BlogProps[], critery: 'asc'|'desc'): BlogProps[] => {
    let newBlogs = blogs.toSorted((a, b) => a.likes < b.likes ? -1 : 1)
    if(critery === 'desc') newBlogs = newBlogs.toReversed()
    return newBlogs
  }

  const handleClickSort = () => {
    dispatch(setBlogs(sortBlogs(blogs, order)))
    setorder(order => order === 'asc' ? 'desc' : 'asc')
  }

  return (
    <section>
      {
        user.username && user.token ?
        <PostBlog></PostBlog> : <></>
      }
      <label>
      Order:
        <button
          onClick={handleClickSort}
          id="sortblogsbutton"
          title="sort by likes button"
          type="button"
        >{ `TO ${order.toString().toUpperCase()}ENDANT` }
        </button>
        <button
          name='refreshBlogs'
          title='Refresh blog list'
          type="button"
          onClick={() => dispatch(getAllBlogsAsync())}
        >REFRESH</button>
      </label>
      <div id="blogscontainer">
        {blogs.map((blog) => (
          <div key={uuidv4()}>
            <Link to={`/blog/${blog.id}`}>{ blog.title } - Likes: { blog.likes }</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
