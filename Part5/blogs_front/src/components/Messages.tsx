import { MessageProps } from "../types/types";
import "../App.css";
import { Icon, Message, Transition } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { Component, useEffect, useRef } from "react";

const Messages = () => {

  const message = useSelector((data: any) => data.messages) as MessageProps|null
  const msgRef = useRef<HTMLDivElement|null>(null)

  useEffect(() => {
    if(msgRef.current) {
      msgRef.current.getAnimations().forEach(anim => {
        anim.finish()
        anim.play()
      })
    }
  }, [message])

  return (
    message && 
    <div ref={msgRef} className="msg-animation high-margin-container">
      <Message
        icon
        hidden={message === null}
        error={message.type === "error"}
        success={message.type === "success"}
        info={message.type === 'info'}
    >
      <Icon loading={message.type === 'loading'} name={
        message.type === 'error' ? 'warning sign' :
        message.type === 'success' ? 'check circle' :
        message.type === 'info' ? 'info' : 
        'circle notched'
      }></Icon>
      <Message.Content>
        <Message.Header>
        {
          message.type === 'error' ? 'Ups...' :
          message.type === 'success' ? 'Done!' :
          message.type === 'info' ? 'Info' :
          'Wait a moment...'
        }
        </Message.Header>
        {message?.msg || ''}
      </Message.Content>
    </Message>
    </div>
  );
};

export default Messages;
