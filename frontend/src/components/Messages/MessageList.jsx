import React, {useEffect} from 'react';
import Message from "./Message";
import './messages.scss'
import {scrollStart} from "../../utils/scrollStart";

const MessageList = () => {
  const messages = [
    {
      id: 1,
      author: 'Alex',
      text: 'Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения Тест сообщения ',
      time: new Date(),
      imageUrl: '',
      userId: 1
    },
    {
      id: 2,
      author: 'Kate',
      text: 'Тест второго сообщения Тест второго сообщения Тест второго сообщения Тест второго сообщения Тест второго сообщения Тест второго сообщения Тест второго сообщения Тест второго сообщения Тест второго сообщения Тест второго сообщения Тест второго сообщения ',
      time: new Date(),
      imageUrl: '',
      userId: 2
    },
  ]

  const userId = 1

  useEffect(() => {
    scrollStart()
  }, [messages])

  return (
    <div className='messages'>
      {
        messages.map(msg => <Message key={msg.id} {...msg} currentUserId={userId}/>)
      }
    </div>
  );
};

export default MessageList;