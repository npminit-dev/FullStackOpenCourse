import { LoginProps } from "../../types/types";
import { FormEvent, useContext, useEffect, useState } from "react";
import { log_in } from "../../utils/userRequests";
import { AxiosStatic } from "axios";
import { useDispatch } from "react-redux";
import { loginAsync } from '../../reduxstate/store';
import { appContext } from "../contexts/AppContextProvider";

const Login = () => {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const { dispatch } = useContext(appContext)

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
