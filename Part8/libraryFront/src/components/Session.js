import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { LOGIN } from "../queries/user";

const Login = ({ show, user, setuser }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("somepassword");
  const [login, result] = useMutation(LOGIN);
  const [credsErr, setcredsErr] = useState(false);

  useEffect(() => {
    let tkn = localStorage.getItem("usersessiontkn");
    if (tkn) {
      let decoded = decodeToken(tkn);
      setuser(null);
      setuser(decoded);
    }
  }, []);

  useEffect(() => {
    if (result.data) {   
      let tkn = result.data?.login?.value || null;
      if(!tkn) {
        setcredsErr(true)
        return
      } else {
        localStorage.setItem("usersessiontkn", tkn);
        let decoded = decodeToken(tkn);
        setuser(decoded); 
        setcredsErr(false)
      }
    }
  }, [result.data]);

  if (!show) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    setusername('')
    setpassword('somepassword')
  };

  const handleLogOut = () => {
    setuser(null);
    localStorage.removeItem("usersessiontkn");
  };

  return (
    <div>
      {user ? (
        <div>
          <h4>{ user.username } <i>has logged</i></h4>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>
              Username:
              <input
                required
                type="text"
                onChange={({ target }) => setusername(target.value)}
              ></input>
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                defaultValue={password}
                onChange={({ target }) => setpassword(target.value)}
              ></input>
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      )}
      {result.error && (
        <div>Server error: {`(${result.error.message})`}. Try again.</div>
      )} 
      {
        credsErr && <div>Wrong credentials! try again</div>
      }
    </div>
  );
};

export default Login;
