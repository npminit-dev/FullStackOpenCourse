import { useState } from "react";
import { v4 } from "uuid";
import { AppDispatch, commentBlogAsync } from "../../reduxstate/store";
import { useDispatch } from "react-redux";

const Comments = ({ comments, id }: { comments: Array<string>, id: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [comment, setcomment] = useState<string>("");

  const handleSubmitComment = (value: string) => {
    if (!value.trim()) console.log("Empty value");
    else {
      dispatch(commentBlogAsync({
        comment: value,
        id
      })).then(() => setcomment(''))
    }
  };

  return (
    <div>
      <div>
        <u>Comments</u>
      </div>
      <form onSubmit={(e) => { 
        e.preventDefault()
        handleSubmitComment(comment) 
      }}>
        <label>
          Insert new:
          <input
            type="text"
            name="commentInput"
            required
            pattern=".{3,500}"
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
          ></input>
          <button
            type="submit"
            title="Submit comment"
          >ADD</button>
        </label>
      </form>
      {comments.map((comment) => (
        <div key={v4()}>
          <i>- {comment}</i>
        </div>
      ))}
    </div>
  );
};

export default Comments;
