import { LoginProps } from "../../types/types";
import { FormEvent, useEffect, useState } from "react";
import { log_in } from "../../utils/userRequests";
import { AxiosStatic } from "axios";

const Login = ({ token, settoken, setmsg }: LoginProps) => {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if(username.trim() && password.trim()) {
      let result: any = await log_in({ username, password })
      if(result instanceof Error) setmsg({msg: `Error: ${result.message} ${result.cause}`, type: 'info'})
      else settoken(result.data)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input onChange={({ target }) => setusername(target.value)} required pattern="[\wáéíóúÁÉÍÓÚ ]{3,30}" />
      </label>
      <label>
        Password:
        <input type="password" pattern=".{3,30}" required onChange={({target}) => setpassword(target.value)} />
      </label>
      <button type="submit" title="submit login">SUBMIT</button>
    </form>
  );
};

export default Login;
