import { FormEvent, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, postBlogAsync } from '../reduxstate/store';
import { appContext } from './contexts/AppContextProvider';

const PostBlog = () => {
  const [title, settitle] = useState<string>("");
  const [url, seturl] = useState<string>("");
  const [likes, setlikes] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>()
  const { user } = useContext(appContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(postBlogAsync({
      token: user.token,
      blog: {
        title,
        url,
        likes
      }      
    })).then(() => {
      settitle('')
      setlikes(0)
      seturl('')
    })
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


