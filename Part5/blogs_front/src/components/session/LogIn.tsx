import { LoginProps } from "../../types/types";
import { FormEvent, useEffect, useState } from "react";
import { log_in } from "../../utils/userRequests";
import { AxiosStatic } from "axios";

const Login = ({ token, settoken, setmsg }: LoginProps) => {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      let result: any = await log_in({ username, password });
      if (result instanceof Error)
        setmsg({
          msg: `Error: ${result.message} ${result.cause}`,
          type: "info",
        });
      else settoken(result.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="loginform">
      <label>
        Username:
        <input
          id="usernameinput"
          onChange={({ target }) => setusername(target.value)}
          required
          pattern="[\wáéíóúÁÉÍÓÚ ]{3,30}"
        />
      </label>
      <label>
        Password:
        <input
          id="passwordinput"
          type="password"
          pattern=".{3,30}"
          required
          onChange={({ target }) => setpassword(target.value)}
        />
      </label>
      <button id="loginsubmitbutton" type="submit" title="submit login">
        SUBMIT
      </button>
    </form>
  );
};

export default Login;
