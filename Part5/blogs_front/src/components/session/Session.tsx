import { useEffect, useState } from "react";
import { SessionProps } from "../../types/types";
import LogIn from "./LogIn";
import { AppDispatch, logWithStorage } from "../../reduxstate/store";
import { useDispatch } from "react-redux";
import UserInfo from "./UserInfo";

const Session = ({ user }: SessionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    dispatch(logWithStorage());
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
