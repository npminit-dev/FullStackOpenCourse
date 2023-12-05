import { Card, Form, Header } from "semantic-ui-react";
import { SignInProps } from "../../types/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, getUsersBlogsAsync, signInAsync } from "../../reduxstate/store";

const SignIn = ({ setpage }: SignInProps) => {

  const [name, setname] = useState<string>('');
  const [username, setusername] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setloading(true)
    try {
      await dispatch(signInAsync({name, username, password}))
      await dispatch(getUsersBlogsAsync())
      setloading(false)
    } catch(err) {
      console.log(err)
      setloading(false)
    }
  }

  return ( <Card.Content>
    <Card.Header>
      <Header size="tiny">Sign in</Header>
    </Card.Header>
    <Card.Meta>
      Create your account  
    </Card.Meta>
    <hr></hr>
    <Form onSubmit={handleSubmit} size="tiny">
      <Form.Input
        required pattern='[\wáéíóúÁÉÍÓÚ ]{3,30}'
        label='name'
        value={name}
        onChange={({ target }) => setname(target.value)}
      ></Form.Input>
      <Form.Input
        required pattern='[\wáéíóúÁÉÍÓÚ ]{3,30}'
        label='username'
        value={username}
        onChange={({ target }) => setusername(target.value)}
      ></Form.Input>
      <Form.Input
        required pattern='.{3,30}'
        label='password'
        value={password}
        onChange={({ target }) => setpassword(target.value)}
      ></Form.Input>
      <div className="max-widthed splitted">
        <Form.Button
          type="button"
          icon='left arrow'
          onClick={() => setpage('login')}
        ></Form.Button>
        <Form.Button
          type="submit"
          content='Sign in'
          loading={loading}
        ></Form.Button>
      </div>
    </Form>
  </Card.Content> );
}
 
export default SignIn;