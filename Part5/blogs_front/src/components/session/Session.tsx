import { useContext, useEffect, useState } from "react";
import LogIn from "./LogIn";
import { logWithStorage } from "../../reduxstate/store";
import UserInfo from "./UserInfo";
import { appContext } from "../contexts/AppContextProvider";

const Session = () => {

  const { dispatch, user } = useContext(appContext)
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    dispatch(logWithStorage() as any);
  }, []);

  return (
    <section>
      USER SESSION
      <div>
        {visible ? (
          <>
            {!user || !user.token ? (
              <LogIn></LogIn>
            ) : (
              <UserInfo name={user.name} username={user.username}></UserInfo>
            )}
            <button
              title="hide"
              type="button"
              onClick={() => setvisible(false)}
            >
              HIDE
            </button>
          </>
        ) : (
          <>
            <button
              title="show"
              type="button"
              onClick={() => setvisible(true)}
            >SHOW</button>
          </>
        )}
      </div>
    </section>
  );
};

export default Session;
