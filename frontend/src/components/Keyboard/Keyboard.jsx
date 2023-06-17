import React, {useState} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './keyboard.scss';
import useWebSocket from "react-use-websocket";
import {v4 as uuidv4} from "uuid";
import {ReactComponent as SendingSVG} from '../../img/sending.svg'

const MessageKeyboard = () => {
    const [message, setMessage] = useState('')

    const { name, id, imageUrl } = {name: 'Alex', id: 1, imageUrl: ''}

    const {sendJsonMessage} = useWebSocket('ws://localhost:8000')

    const send = () => {
        if (message.trim().length > 0) {
            setMessage('');

            const msg = {
                author: name,
                id: uuidv4(),
                text: message,
                time: new Date().toISOString(),
                userId: id,
            }

            sendJsonMessage(msg)
        }
    }


    return <div className='keyboard-controller'>
        <TextareaAutosize
            maxRows={5}
            placeholder='Сообщение...'
            className='keyboard'
            value={message}
            onChange={e => setMessage(e.target.value)}
        />
        <div className="send">
            <SendingSVG />
        </div>
    </div>;
};

export default MessageKeyboard;