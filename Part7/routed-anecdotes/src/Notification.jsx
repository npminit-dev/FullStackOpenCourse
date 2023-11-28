import { useEffect, useRef, useContext } from "react";
import { appContext } from './AppContextProvider';

const Notification = () => {
  const timer = useRef(null);
  const msgElem = useRef(null);
  const { notification } = useContext(appContext)

  useEffect(() => {
    console.log('asd')
    clearTimeout(timer.current);
    if (notification.msg !== "") {
      msgElem.current.style.display = "block";
      timer.current = setTimeout(() => {
        msgElem.current.style.display = "none";
      }, 2000);
    }
    return () => clearTimeout(timer.current)
  }, [notification]);

  return (
    <>
      {notification && notification.msg !== "" ? (
        <h3 ref={msgElem} style={{ display: "none" }}>
          {notification.msg}
        </h3>
      ) : (
        <></>
      )}
    </>
  );
};

export default Notification;
