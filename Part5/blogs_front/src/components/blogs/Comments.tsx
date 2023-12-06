import { v4 } from "uuid";
import { AppDispatch } from "../../reduxstate/store";
import { useDispatch } from "react-redux";
import { Comment } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import { useRef } from "react";

const Comments = ({
  comments,
  id,
}: {
  comments: Array<string>;
  id: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const oldRef = useRef<number>(comments.length - 1);

  return (
    <div className="high-margin-container low-padded-container">
      {comments.length ? (
        <Comment.Group>
          {comments.map((comment, i) => (
            <Comment key={v4()}>
              <Comment.Metadata
                content={
                  i <= oldRef.current
                  ? `${Math.round(Math.random() * 100)} days ago`
                  : "Just now"
                }
              />
              <Comment.Content content={comment} />
            </Comment>
          ))}
        </Comment.Group>
      ) : (
        <div className="centered-content high-margin-container secondary-font">
          <span className="high-margin-container">
            <i>This post doesn't have comments... why do you haven't post one yet?</i>
          </span>
        </div>
      )}

      <CommentForm id={id}></CommentForm>
    </div>
  );
};

export default Comments;
