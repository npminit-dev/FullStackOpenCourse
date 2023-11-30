import { FormEvent, useState, useRef, Dispatch } from 'react';
import { BlogProps, PostBlogProps } from "../types/types";
import { post_Blog } from "../utils/userRequests";
import { useDispatch } from 'react-redux';
import { AppDispatch, postBlogAsync } from '../reduxstate/store';

const PostBlog = ({ token, setmsg, user }: PostBlogProps) => {
  const [title, settitle] = useState<string>("");
  const [url, seturl] = useState<string>("");
  const [likes, setlikes] = useState<number>(0);
  const titleRef = useRef<HTMLInputElement|null>(null)
  const urlRef = useRef<HTMLInputElement|null>(null)
  const likesRef = useRef<HTMLInputElement|null>(null)

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(postBlogAsync({
      token,
      blog: {
        title,
        url,
        likes
      }      
    }))
    // let response: any = await post_Blog(token, { title, url, likes });
    // if (response.status > 299 || response.status < 200)
    //   setmsg({ msg: `Error: ${response.statusText}`, type: "info" });
    // else
    //   setblogs((blogs) => {
    //     let data = response.data;
    //     console.log(data);
    //     let newBlog: BlogProps = {
    //       id: data.id,
    //       author: { username: user.username },
    //       title: data.title,
    //       url: data.url,
    //       likes: data.likes,
    //     };
    //     return blogs.concat(newBlog);
    //   });
      if(titleRef.current) titleRef.current.value = ''
      if(urlRef.current) urlRef.current.value = ''
      if(likesRef.current) likesRef.current.value = ''
  };

  return (
    <>
      <form id="postblogform" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            ref={titleRef}
            className="titleinput"
            required
            onChange={({ target }) => settitle(target.value)}
          ></input>
        </label>
        <label>
          URL:
          <input
          ref={urlRef}
            className="urlinput"
            required
            onChange={({ target }) => seturl(target.value)}
          ></input>
        </label>
        <label>
          LIKES:
          <input
          ref={likesRef}
            className="likesinput"
            onChange={({ target }) => setlikes(parseInt(target.value))}
            type="number"
          ></input>
        </label>
        <button id="postblog" type="submit">POST</button>
      </form>
    </>
  );
};

export default PostBlog;


