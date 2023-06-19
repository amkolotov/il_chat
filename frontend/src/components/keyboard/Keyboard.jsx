import React, {useState} from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./keyboard.scss";
import {ReactComponent as SendingSVG} from "../../img/sending.svg"

const MessageKeyboard = ({socket}) => {
  const [message, setMessage] = useState("")

  const requestId = new Date().getTime()

  const sendMessage = () => {
    socket.send(JSON.stringify({
      message: message,
      action: "create_message",
      request_id: requestId,
    }));
    setMessage("")
  }

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      sendMessage()
    }
  }

  return <div className="keyboard-controller">
    <TextareaAutosize
      maxRows={5}
      placeholder="Сообщение..."
      className="keyboard"
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyDown={onEnterPress}
    />
    <div className="send" onClick={sendMessage}>
      <SendingSVG/>
    </div>
  </div>;
};

export default MessageKeyboard;