import { FormEvent, useContext, useState } from "react";
import { AppDispatch, loginAsync, setMessage } from "../../reduxstate/store";
import { Card, Form, Header } from "semantic-ui-react";
import SignIn from "./SignIn";
import { useDispatch } from "react-redux";

const Login = () => {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [page, setpage] = useState<"login" | "signin">("login");
  const [loading, setloading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent) => {
    setloading(true);
    dispatch(setMessage({ msg: "Loggin in, wait a moment", type: "loading" }));
    dispatch(loginAsync({ username, password }))
      .then(() => {
        setloading(false);
        dispatch(
          setMessage({
            msg: "You have successfully logged in",
            type: "success",
          })
        );
      })
      .catch((err) => {
        setloading(false);
        dispatch(
          setMessage({
            msg: "Unable to login! Check your credentials",
            type: "error",
          })
        );
        console.log(err.message);
      });
  };

  return (
    <Card>
      {page === "login" && (
        <Card.Content>
          <Card.Header>
            <Header size="tiny">Login</Header>
          </Card.Header>
          <Card.Meta>With an existing account</Card.Meta>
          <hr className="secondary-font"></hr>
          <Form size="tiny" onSubmit={(e) => handleSubmit(e)}>
            <Form.Input
              id="usernameinput"
              required
              pattern="[\wáéíóúÁÉÍÓÚ ]{3,30}"
              onChange={({ target }) => setusername(target.value)}
              label="Username"
            ></Form.Input>
            <Form.Input
              id="passwordinput"
              required
              pattern=".{3,30}"
              type="password"
              onChange={({ target }) => setpassword(target.value)}
              label="Password"
            ></Form.Input>
            <div className="max-widthed splitted">
              <Form.Button
                compact
                floated="left"
                id="loginsubmitbutton"
                type="submit"
                title="submit login"
                content="Log in"
                loading={loading}
              ></Form.Button>
              <Form.Button
                compact
                floated="right"
                id="tosigninbutton"
                type="button"
                title="go to sign in"
                content="Create"
                onClick={() => setpage("signin")}
              ></Form.Button>
            </div>
          </Form>
        </Card.Content>
      )}
      {page === "signin" && <SignIn setpage={setpage}></SignIn>}
    </Card>
  );
};

export default Login;
