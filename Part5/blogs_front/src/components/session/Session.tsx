import { useEffect } from "react";
import { SessionProps } from "../../types/types";
import LogIn from "./LogIn";
import { decodeJWT } from "../../utils/utils";
import { AppDispatch, logWithStorage } from "../../reduxstate/store";
import { useDispatch } from "react-redux";

const Session = ({ user }: SessionProps) => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(logWithStorage())
  }, []);

  return (
    <section>
      {!user || !user.token ? (
        <LogIn></LogIn>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Session;


