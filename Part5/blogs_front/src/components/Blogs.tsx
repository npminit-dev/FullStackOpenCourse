import { BlogProps } from "../types/types";
import { v4 as uuidv4 } from 'uuid';

const Blogs = ({ blogs }: BlogProps) => {

  return ( 
    <section>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
        {
          blogs.map(blog => 
            <tr key={uuidv4()}>
              <td>{blog.title}</td>
              <td>{blog.url}</td>
              <td>{blog.likes}</td>
            </tr>
          ) 
        }
        </tbody>
      </table>
    </section>
  );
}
 
export default Blogs;