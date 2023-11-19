import { LoginProps } from "../../types/types";
import { FormEvent, useEffect, useState } from "react";
import { log_in } from "../../utils/userRequests";
import { decodeJWT } from "../../utils/utils";

const Login = ({ token, settoken, setmsg }: LoginProps) => {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  useEffect(() => {
    console.log(username)
    console.log(password)
  }, [username, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if(username.trim() && password.trim()) {
      let req = await log_in({ username, password })
      if(req.status > 299 && req.status < 200) setmsg(`Error: ${req.status}`) 
      else settoken(req.data)
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
      <button type="submit" title="submit login">LOGIN</button>
    </form>
  );
};

export default Login;
