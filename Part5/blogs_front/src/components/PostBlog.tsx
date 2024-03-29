import { FormEvent, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, postBlogAsync, setMessage } from "../reduxstate/store";
import { appContext } from "./contexts/AppContextProvider";
import { Accordion, Divider, Form, Icon, Transition } from "semantic-ui-react";

const PostBlog = () => {
  const [title, settitle] = useState<string>("");
  const [url, seturl] = useState<string>("");
  const [dropped, setdropped] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(appContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setMessage({ msg: "We are posting yout blog", type: "loading" }));
    dispatch(
      postBlogAsync({
        token: user.token,
        blog: { title, url },
      })
    )
      .then(() => {
        clearFields()();
        dispatch(
          setMessage({
            msg: "Your post has successfully created!",
            type: "success",
          })
        );
        setdropped(false);
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setMessage({
            msg: "We couldn't post your blog, try again later",
            type: "error",
          })
        );
      });
  };

  const clearFields = () => {
    return () => {
      settitle((title) => "");
      seturl((url) => "");
    };
  };

  return (
    <>
      <Accordion>
        <Accordion.Title active={!dropped} onClick={() => setdropped(!dropped)}>
          <Icon circular name="dropdown"></Icon>
          <span className="medium-font">
            <strong>Click to post a blog!</strong>
          </span>
        </Accordion.Title>
        <Accordion.Content active={dropped}>
          <Transition animation="scale" visible={dropped} duration={300}>
            <Form id="postblogform" onSubmit={handleSubmit}>
              <Form.Input
                label={"Title"}
                value={title}
                required
                pattern=".{4,150}"
                onChange={({ target }) => settitle(target.value)}
              ></Form.Input>
              <Form.Input
                label={"URL"}
                value={url}
                required
                pattern=".{4,150}"
                onChange={({ target }) => seturl(target.value)}
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
      <Divider horizontal>
        <span>{"<bloglist/>"}</span>
      </Divider>
    </>
  );
};

export default PostBlog;
