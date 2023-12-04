import { FormEvent, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, postBlogAsync } from "../reduxstate/store";
import { appContext } from "./contexts/AppContextProvider";
import { Accordion, Form, Icon, Transition } from "semantic-ui-react";

const PostBlog = () => {
  const [title, settitle] = useState<string>("");
  const [url, seturl] = useState<string>("");
  const [likes, setlikes] = useState<number>(0);
  const [dropped, setdropped] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(appContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      postBlogAsync({
        token: user.token,
        blog: { title, url, likes },
      })
    ).then(() => {
      settitle("");
      setlikes(0);
      seturl("");
      setdropped(false);
    });
  };

  const clearFields = () => {
    return () => {
      settitle((title) => "");
      seturl((url) => "");
      setlikes((likes) => 0);
    };
  };

  return (
    <>
      <Accordion styled>
        <Accordion.Title active={!dropped} onClick={() => setdropped(!dropped)}>
          <Icon circular name="dropdown"></Icon>
          <span> </span>Click to post a blog!
        </Accordion.Title>
        <Accordion.Content active={dropped}>
          <Transition animation="scale" visible={dropped} duration={300}>
            <Form id="postblogform" onSubmit={handleSubmit}>
              <Form.Input
                label={"Title"}
                value={title}
                required
                pattern=".{4,30}"
                onChange={({ target }) => settitle(target.value)}
              ></Form.Input>
              <Form.Input
                label={"URL"}
                value={url}
                required
                pattern=".{4,300}"
                onChange={({ target }) => seturl(target.value)}
              ></Form.Input>
              <Form.Input
                label={"Likes"}
                value={likes}
                required
                pattern=".{4,30}"
                type="number"
                onChange={({ target }) => setlikes(parseInt(target.value))}
              ></Form.Input>
              <Form.Group>
                <Form.Button type="submit" primary>
                  Post
                </Form.Button>
                <Form.Button type="button" secondary onClick={clearFields()}>
                  Clear
                </Form.Button>
              </Form.Group>
            </Form>
          </Transition>
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default PostBlog;
