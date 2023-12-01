import { LoginProps } from "../../types/types";
import { FormEvent, useEffect, useState } from "react";
import { log_in } from "../../utils/userRequests";
import { AxiosStatic } from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch, loginAsync } from "../../reduxstate/store";

const Login = () => {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginAsync({username, password}))
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
