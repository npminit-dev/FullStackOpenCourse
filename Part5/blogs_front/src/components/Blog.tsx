import { Blog as BlogT } from "../types/types";
import Toggle from "./Toggle";
import '../App.css'
import { like_Blog } from "../utils/userRequests";

const Blog = ({ id, author, title, url, likes, token }: BlogT&{token: string|null}) => {

  const handleLikeIncrement = async () => {
    let result = like_Blog(token || '', id, likes + 1)
    if(result instanceof Error) 
  }


  return ( 
    <>
      <div className="blogbox">
        <span>Author: {author.username}</span>
        <span>Title: {title}</span>
        <Toggle showtext="DETAILS" hidetext="HIDE DETAILS">
          <span>URL: {url}</span>
          <span>
            Likes: {likes}
            {
            token &&
            <button 
              title="Like Button" 
              type="button"
              onClick={() => handleLikeIncrement()}
            >LIKE</button>
            }
          </span>
        </Toggle>
      </div>
      <hr></hr>
    </>
  );
}
 
export default Blog;