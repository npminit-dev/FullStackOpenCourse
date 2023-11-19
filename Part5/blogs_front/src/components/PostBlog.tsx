import { FormEvent, useState } from "react";
import { PostBlogProps } from "../types/types";
import { post_Blog } from "../utils/userRequests";

const PostBlog = ({ token, setblogs, setmsg }: PostBlogProps) => {

  const [title, settitle] = useState<string>('');
  const [url, seturl] = useState<string>('');
  const [likes, setlikes] = useState<number>(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    let response = await post_Blog(token, { title, url, likes })
    if(response.status > 299 || response.status < 200) setmsg(`Error: ${response.statusText}`)
    else setblogs(blogs => blogs.concat(response.data))
  }

  return <>
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input required onChange={({ target }) => settitle(target.value)}></input>
      </label>
      <label>
        URL:
        <input required onChange={({ target }) => seturl(target.value)}></input>
      </label>
      <label>
        LIKES:
        <input onChange={({ target }) => setlikes(parseInt(target.value))} type="number"></input>
      </label>
      <button type="submit">POST</button>
    </form>
  </> 
}
 
export default PostBlog;