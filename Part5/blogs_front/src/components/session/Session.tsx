import { useContext, useEffect, useState } from "react";
import LogIn from "./LogIn";
import { logWithStorage } from "../../reduxstate/store";
import UserInfo from "./UserInfo";
import { appContext } from "../contexts/AppContextProvider";

const Session = () => {

  const { dispatch, user } = useContext(appContext)
  
  useEffect(() => {
    dispatch(logWithStorage() as any);
  }, []);

  return (
    <section>
      <div>   
        {!user || !user.token ? (
          <LogIn></LogIn>
        ) : (
          <UserInfo name={user.name} username={user.username}></UserInfo>
        )}
      </div>
    </section>
  );
};

export default Session;
