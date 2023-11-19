import { useEffect } from "react";
import { SessionProps } from "../../types/types";
import LogIn from "./LogIn";
import { decodeJWT } from "../../utils/utils";

const Session = ({ user, setuser, token, settoken, setmsg }: SessionProps) => {
  useEffect(() => {
    let LS_token = globalThis.localStorage.getItem("lsssstkn");
    if (LS_token) {
      const result: any = decodeJWT(LS_token);
      if (result instanceof Error)
        setmsg(`Error: ${result.message} ${result.cause}`);
      else {
        settoken(LS_token);
        setuser({ name: result.name, username: result.username });
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      let data: any = decodeJWT(token);
      setuser(data ? { name: data.name, username: data.name } : null);
      globalThis.localStorage.setItem("lsssstkn", token);
    }
  }, [token]);

  return (
    <section>
      {!user || !token ? (
        <LogIn {...{ token, settoken, setmsg }}></LogIn>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Session;
