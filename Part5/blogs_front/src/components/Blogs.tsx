import { useEffect } from "react";
import { BlogsProps } from "../types/types";
import { v4 as uuidv4 } from 'uuid';
import Toggle from "./Toggle";
import Blog from "./Blog";

const Blogs = ({ blogs, token }: BlogsProps&{token: string|null}) => {

  useEffect(() => {
    console.log(blogs)
  }, [blogs]);

  return ( 
    <section>
      <hr></hr>
      <div>
      {
      blogs.map(blog => 
        <span key={uuidv4()}>
          <Blog {...blog} token={token}></Blog>
        </span>
      ) 
      }
      </div>
    </section>
  );
}
 
export default Blogs;