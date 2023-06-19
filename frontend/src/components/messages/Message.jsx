import React from "react";
import {timeFormatter} from "../../utils/timeFormatter";
import {ReactComponent as SendSVG} from "../../img/send.svg"
import {ReactComponent as ReadSVG} from "../../img/read.svg"
import {ReactComponent as CornerInSVG} from "../../img/corner-in.svg"
import {ReactComponent as CornerOutSVG} from "../../img/corner-out.svg"

const Message = (
  {user, text, createdAt, date, isOut, isSend, isRead, isAdditional}
) => {

  const getMessageClassName = () => {
    let className = "message"
    if (isAdditional) className += " message__added"
    className += isOut ? " message__out" : " message__in"
    return className
  }

  return (
    <>
      {
        !!date &&
        <div className="message-date">
          {date}
        </div>
      }
      <div className={getMessageClassName()}>
        {isOut && !isAdditional && <CornerOutSVG className="message__corner-out"/>}
        {!isOut && !isAdditional && <CornerInSVG className="message__corner-in"/>}
        <div className="message-content">
          {!isOut &&
            <h2 className="message__title">{user.username}</h2>
          }
          <div className={isOut ? "message__body" : "message__body message__body-in"}>
            {text}
          </div>
          <div className="message__footer">
            <div className={isOut ? "message__time" : "message__time message__time-in"}>
              {timeFormatter(createdAt)}
            </div>
            {isOut && isSend && !isRead &&
              <div className="message__mark message__mark-sent">
                <SendSVG/>
              </div>
            }
            {isOut && isRead &&
              <div className="message__mark message__mark-read">
                <ReadSVG/>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;