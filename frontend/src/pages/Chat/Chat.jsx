import Header from "../../components/Header/Header";
import MessageList from "../../components/Messages/MessageList";
import MessageKeyboard from "../../components/Keyboard/Keyboard";
import './chat.scss'

const Chat = () => {

    return (
        <div className='chat-container'>
            <Header />
            <MessageList />
            <MessageKeyboard />
        </div>
    );
};

export default Chat;