import { useRef, useState, useEffect } from "react";
import { MessageProps } from "../types/types";
import '../App.css'

const Messages = ({ msg }: MessageProps) => {

  const msgElem = useRef<HTMLParagraphElement|null>(null)

  useEffect(() => {
    msgElem.current?.getAnimations().forEach(anim => {
      anim.cancel()
      anim.play()
    })
  }, [msg]);

  return ( 
    <>
    {
      msg ? <p className="msg" ref={msgElem}>{ msg.msg }</p> : <></>
    }
    </>
  );
}
 
export default Messages;