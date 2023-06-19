import React, {useEffect, useRef, useState} from "react";
import Message from "./Message";
import "./messages.scss"
import {scrollBottom} from "../../utils/scrollBottom";
import Api from "../../services/Api";
import {ReactComponent as ExitSVG} from "../../img/exit.svg";
import CookieHandler from "../../utils/cookieHandler";
import {useNavigate} from "react-router-dom";
import {getDateIds} from "../../utils/getDateIds";

const MessageList = ({roomId, socket}) => {

  const navigate = useNavigate();
  const messagesRef = useRef();

  const requestId = new Date().getTime();

  const [userId, setUserId] = useState(0);
  const [roomName, setRoomName] = useState("");
  const [countMembers, setCountMembers] = useState(0);

  const [messages, setMessages] = useState([]);
  const [datesIds, setDatesIds] = useState([]);
  const [unreadMessagesIds, setUnreadMessagesIds] = useState([]);
  const [lastMessage, setLastMessage] = useState({});

  const [tabHasFocus, setTabHasFocus] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const sendRead = (readIds) => {
    socket.send(
      JSON.stringify({
        pk_list: readIds,
        action: "read",
        request_id: requestId,
      })
    );
  }

  const logout = () => {
    CookieHandler.deleteCookie("access");
    navigate("/login");
  }

  const fetchMessages = async (pageNumber) => {
    const successData = await Api.makeGetRequest(
      `room/${roomId}/messages?page=${pageNumber}`
    );
    if (successData) {
      if (successData.roomName) setRoomName(successData.roomName);
      if (successData.user) setUserId(successData.user);
      if (successData.countMembers) setCountMembers(successData.countMembers);

      if (successData.results?.length) {
        setMessages((prevState) => {
          let messagesState = [...successData.results.reverse(), ...prevState];
          setDatesIds(getDateIds(messagesState));
          return messagesState;
        });
        sendRead(successData.results.map(el => el.id));
      }
      setHasNext(!!successData?.next);
    } else {
      logout()
    }
  }

  const onScroll = () => {
    if (messagesRef.current) {
      const {scrollTop} = messagesRef.current;
      if (scrollTop === 0 && hasNext) {
        setCurrPage(prevState => prevState + 1);
      }
    }
  };

  useEffect(() => {
    fetchMessages(currPage);
  }, [currPage]);

  useEffect(() => {
    scrollBottom(messagesRef.current);
  }, [userId, lastMessage])


  useEffect(() => {
    const handleFocus = () => {
      setTabHasFocus(true);
    };

    const handleBlur = () => {
      setTabHasFocus(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    if (tabHasFocus && unreadMessagesIds.length) {
      sendRead(unreadMessagesIds);
      setUnreadMessagesIds([]);
    }
  }, [tabHasFocus])

  socket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    if (data?.data) {
      switch (data.action) {
        case "create":
          setMessages(prevState => [...prevState, data.data]);
          if (tabHasFocus) {
            sendRead([data.data.id])
          } else {
            setUnreadMessagesIds(prevState => [...prevState, data.data.id])
          }
          setCountMembers(data.data.members_count)
          setLastMessage(data.data)
          break;
        case "update":
          setMessages((prevState) => {
            let messagesState = JSON.parse(JSON.stringify(prevState));
            const index = messagesState.findIndex(obj => obj.id === data.data.id);
            messagesState[index].readCount = data.data.read_count;
            return messagesState;
          });
          setCountMembers(data.data.members_count)
          break;
        default:
          break;
      }
    }
  }

  return (
    <>
      <div className="messages-container">
        <div className="header">
          <h2>{roomName}</h2>
          <p>{countMembers} участника</p>
          <div className="header__exit" onClick={() => navigate('/')}>
            <ExitSVG/>
          </div>
        </div>

        <div className="messages" onScroll={onScroll} ref={messagesRef}>
          {
            !!messages.length && messages.map((msg, index) => {
              const isOut = userId === msg.user.id;
              const isRead = msg.readCount >= countMembers;
              let isAdditional = false;
              if (index) {
                isAdditional = msg.user.id === messages[index - 1].user.id;
              }
              const dateId = datesIds.findIndex(obj => obj.firstMessageId === msg.id);
              const date = dateId !== -1 ? datesIds[dateId].date : '';

              return (
                <Message
                  key={msg.id}
                  {...msg}
                  isOut={isOut}
                  isSend={true}
                  isRead={isRead}
                  isAdditional={isAdditional}
                  date={date}
                />
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default MessageList;