import { FormEvent, useState, useRef, Dispatch, useContext } from 'react';
import { BlogProps, PostBlogProps } from "../types/types";
import { post_Blog } from "../utils/userRequests";
import { useDispatch } from 'react-redux';
import { AppDispatch, postBlogAsync } from '../reduxstate/store';
import { blogsContext } from './contexts/BlogsContextProvider';

const PostBlog = ({ token, setmsg, user }: PostBlogProps) => {
  const [title, settitle] = useState<string>("");
  const [url, seturl] = useState<string>("");
  const [likes, setlikes] = useState<number>(0);
  const { dispatchToggleStatus } = useContext(blogsContext)

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
    })).then((res) => dispatchToggleStatus({ type: 'add', payload: res.payload.id }))
  };

  return (
    <>
      <form id="postblogform" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            value={title}
            className="titleinput"
            required
            onChange={({ target }) => settitle(target.value)}
          ></input>
        </label>
        <label>
          URL:
          <input
            value={url}
            className="urlinput"
            required
            onChange={({ target }) => seturl(target.value)}
          ></input>
        </label>
        <label>
          LIKES:
          <input
            value={likes}
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


