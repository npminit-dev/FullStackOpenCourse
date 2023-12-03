import { AppDispatch, likeBlogAsync, removeBlogAsync } from "../../reduxstate/store";
import { useNavigate, useParams } from "react-router-dom";
import { appContext } from "../contexts/AppContextProvider";
import { useContext, useEffect, useState } from "react";
import { BlogProps } from "../../types/types";
import Comments from "./Comments";
import { useDispatch } from "react-redux";

const Blog = (): JSX.Element => {
  const { id } = useParams();
  const [blogdata, setblogdata] = useState<BlogProps | null>();
  const { user, blogs } = useContext(appContext);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setblogdata((b) => blogs.find((blog) => blog.id === id));
  }, [blogs]);

  const handleLikeIncrement = async (): Promise<any> => {
    if(blogdata) {
      dispatch(
        likeBlogAsync({
          token: user.token || "",
          id: blogdata?.id,
          likes: blogdata?.likes + 1,
        })
      )
    }
  };

  const handleRemove = async (): Promise<any> => {
    if(blogdata) {
      dispatch(
        removeBlogAsync({
          token: user.token || "",
          id: blogdata.id,
        })
      ).then(() => navigate('/blogs'))
    }
  };

  return (
    <>
      {blogdata && (
        <div>
          <div>Author: {blogdata.author.username}</div>
          <div>Title: {blogdata.title}</div>
          <div>URL: {blogdata.url}</div>
          <div>
            Likes: {blogdata.likes}
            {user.token !== null && (
              <button
                className="likebutton"
                title="Like blog Button"
                type="button"
                onClick={async () => await handleLikeIncrement()}
              >
                LIKE
              </button>
            )}
            {blogdata.author.username === user.username &&
            user.token !== null ? (
              <button
                onClick={async () => await handleRemove()}
                title="Remove blog button"
                type="button"
              >
                REMOVE
              </button>
            ) : (
              <></>
            )}
          </div>
          { id && <Comments comments={blogdata.comments} id={id}></Comments>  }
        </div>
      )}
      <button
        name="backToBlogs"
        title="go back to blogs page"
        type="button"
        onClick={() => navigate("/blogs")}
      >BACK</button>
      <hr></hr>
    </>
  );
};

export default Blog;
