import React from 'react';
import {dateFormatter} from "../../utils/dateFormatter";
// import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ReactComponent as SendSVG} from '../../img/send.svg'
import {ReactComponent as ReadSVG} from '../../img/read.svg'
import {ReactComponent as CornerInSVG} from '../../img/corner-in.svg'
import {ReactComponent as CornerOutSVG} from '../../img/corner-out.svg'

const Message = ({author, text, time, userId, currentUserId, isSend, isRead}) => {
  // const user = useTypedSelector(state => state.user)

  const isOut = userId === currentUserId
  isSend = true
  isRead = true

  return (
    <div className={isOut ? 'message message__out' : 'message message__in'}>
      {isOut && <div className='message__corner-out'><CornerOutSVG /></div> }
      {!isOut && <div className='message__corner-in'><CornerInSVG /></div> }
      <div className="message-content">
        {!isOut &&
          <h2 className="message__title">{author}</h2>
        }
        <div className={isOut ? 'message__body' : 'message__body message__body-in'}>{text}</div>
        <div className="message__footer">
          <div className={isOut ? 'message__time' : 'message__time message__time-in'}>{dateFormatter(time)}</div>
          {isOut && isSend && !isRead &&
            <div className="message__mark message__mark-sent">
              <SendSVG />
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
  );
};

export default Message;