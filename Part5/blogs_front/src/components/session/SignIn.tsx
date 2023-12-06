import { Card, Form, Header } from "semantic-ui-react";
import { SignInProps } from "../../types/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  getUsersBlogsAsync,
  setMessage,
  signInAsync,
} from "../../reduxstate/store";

const SignIn = ({ setpage }: SignInProps) => {
  const [name, setname] = useState<string>("");
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setloading(true);
    dispatch(setMessage({ msg: 'we are working on your new account', type: 'loading' }))
    dispatch(signInAsync({ name, username, password }))
      .then(() => {
        dispatch(
          setMessage({
            msg: "You has successfully registered! login with your username and password",
            type: "success",
          })
        );
        setloading(false);
        dispatch(getUsersBlogsAsync());
      })
      .catch((err) => {
        dispatch(
          setMessage({
            msg: "Error on your register! the username already exists",
            type: "error",
          })
        );
        setloading(false);
        console.log(err);
      });
  };

  return (
    <Card.Content>
      <Card.Header>
        <Header size="tiny">Sign in</Header>
      </Card.Header>
      <Card.Meta>Create your account</Card.Meta>
      <hr></hr>
      <Form onSubmit={handleSubmit} size="tiny">
        <Form.Input
          required
          pattern="[\wáéíóúÁÉÍÓÚ ]{3,30}"
          label="name"
          value={name}
          onChange={({ target }) => setname(target.value)}
        ></Form.Input>
        <Form.Input
          required
          pattern="[\wáéíóúÁÉÍÓÚ ]{3,30}"
          label="username"
          value={username}
          onChange={({ target }) => setusername(target.value)}
        ></Form.Input>
        <Form.Input
          required
          pattern=".{3,30}"
          label="password"
          value={password}
          onChange={({ target }) => setpassword(target.value)}
        ></Form.Input>
        <div className="max-widthed splitted">
          <Form.Button
            type="button"
            icon="left arrow"
            onClick={() => setpage("login")}
          ></Form.Button>
          <Form.Button
            type="submit"
            content="Sign in"
            loading={loading}
          ></Form.Button>
        </div>
      </Form>
    </Card.Content>
  );
};

export default SignIn;
