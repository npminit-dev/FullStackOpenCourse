import { useRef, useState, useEffect } from "react";
import { MessageProps } from "../types/types";

const Messages = ({ msg, setmsg }: MessageProps) => {

  const [visible, setvisible] = useState<boolean>(false);
  const timer = useRef<null|NodeJS.Timeout>(null)

  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    if(msg) {
      setvisible(true)
      timer.current = setTimeout(() => {
        setvisible(false)
        setmsg(null)
        timer.current && clearTimeout(timer.current)
      }, 5000)
    }
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [msg]);

  return ( 
    <>
    {
      visible && msg ? <p>{ msg }</p> : <></>
    }
    </>
  );
}
 
export default Messages;