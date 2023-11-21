import { FormEvent, useState } from "react";
import { BlogProps, PostBlogProps } from "../types/types";
import { post_Blog } from "../utils/userRequests";

const PostBlog = ({ token, setblogs, setmsg, user }: PostBlogProps) => {

  const [title, settitle] = useState<string>('');
  const [url, seturl] = useState<string>('');
  const [likes, setlikes] = useState<number>(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    let response: any = await post_Blog(token, { title, url, likes })
    if(response.status > 299 || response.status < 200) setmsg({msg: `Error: ${response.statusText}`, type: 'info'})
    else setblogs(blogs => {
      let data = response.data
      console.log(data)
      let newBlog: BlogProps = { id: data.id, author: { username: user.username }, title: data.title, url: data.url, likes: data.likes }
      return blogs.concat(newBlog)
    })
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