import { FormEvent, useState } from "react";
import { Form } from "semantic-ui-react";
import { AppDispatch, commentBlogAsync } from '../../reduxstate/store';
import { useDispatch } from "react-redux";

const CommentForm = ({id}: {id: string}) => {

  const [comment, setcomment] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) console.log("Empty value");
    else {
      dispatch(commentBlogAsync({
        comment: comment,
        id
      })).then(() => setcomment(''))
    }
  };

  return (
    <Form
      size="mini"
      onSubmit={(e) => {handleSubmitComment(e)}}
    >
      <Form.Group>
        <Form.Input
          type="text"
          name="commentInput"
          required
          pattern=".{3,500}"
          value={comment}
          onChange={(e) => setcomment(e.target.value)}
        ></Form.Input>
        <Form.Button size="tiny" type="submit" title="Submit comment">
          Comment
        </Form.Button>
      </Form.Group>
    </Form>
  );
};

export default CommentForm;
