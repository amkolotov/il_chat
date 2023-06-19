import MessageList from "../../components/messages/MessageList";
import MessageKeyboard from "../../components/keyboard/Keyboard";
import "./chat.scss"
import {Constants} from "../../constants/Constants";
import CookieHandler from "../../utils/cookieHandler";
import {useParams} from "react-router-dom";

const Chat = () => {

  const {id} = useParams();

  const chatSocket = new WebSocket(
    Constants.WS_HOST + `?token=${CookieHandler.getCookie("access")}`
  );
  const requestId = new Date().getTime()

  chatSocket.onopen = function () {
    chatSocket.send(
      JSON.stringify({
        pk: id,
        action: "join_room",
        request_id: requestId,
      })
    );
    chatSocket.send(
      JSON.stringify({
        pk: id,
        action: "subscribe_to_messages_in_room",
        request_id: requestId,
      })
    );
    chatSocket.send(
      JSON.stringify({
        pk: id,
        action: "subscribe_instance",
        request_id: requestId,
      })
    );
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <MessageList roomId={id} socket={chatSocket}/>
        <MessageKeyboard socket={chatSocket}/>
      </div>
    </div>
  );
};

export default Chat;
