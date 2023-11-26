import { useEffect, useRef, useContext } from "react";
import { notificationContext } from '../contexts/NotificationContextProvider';

const Notification = () => {
  const { message } = useContext(notificationContext)
  const ref = useRef(null);
  const timer = useRef(null)

  useEffect(() => {
    clearTimeout(timer.current)
    if(ref.current) {
      ref.current.style.display = 'block'
      timer.current = setTimeout(() => {
        ref.current.style.display = 'none'
      }, 5000)
    }
  }, [message]);

  return (
    <>
      {message && (
        <div ref={ref} style={style}>
          {message.msg}
        </div>
      )}
    </>
  );
};

const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
  marginBottom: 5,
};

export default Notification;
