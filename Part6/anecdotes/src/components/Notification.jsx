import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { setmsg } from '../reducers/anecdoteReducer';
import '../App.css'

const Notification = () => {

  const dispatch = useDispatch()
  const { notification } = useSelector((state) => state);
  const timer = useRef(null);
  const divRef = useRef(null)

  useEffect(() => {
    globalThis.clearTimeout(timer.current);
    divRef.current.classList.remove('hidemsg')
    divRef.current.classList.add('showmsg')
    timer.current = globalThis.setTimeout(() => {
      divRef.current.classList.remove('showmsg')
      divRef.current.classList.add('hidemsg')
    }, 3000);
  }, [notification]);

  useEffect(() => {
    console.log(notification)
  }, [notification]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <>
      {notification !== "" && <div ref={divRef} style={style} className='showmsg'> {notification.msg}</div>}
    </>
  );
};

export default Notification;
