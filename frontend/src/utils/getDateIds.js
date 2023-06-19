import moment from "moment";
import 'moment/locale/ru'
moment.locale("ru");

export const getDateIds = (messages) => {
  if (!!messages.length) {
    let messagesDates = []
    let currentDate = moment(messages[0].createdAt).local().get('date')
    messagesDates.push(
      {
        date: moment(messages[0].createdAt).local().format("DD MMMM YYYY"),
        firstMessageId: messages[0].id
      }
    )
    for (let i = 0; i < messages.length; i++) {
      const newDate = moment(messages[i].createdAt).local().get('date')
      if (newDate !== currentDate) {
        messagesDates.push(
            {
              date: moment(messages[i].createdAt).local().format("DD MMMM YYYY"),
              firstMessageId: messages[i].id
            }
          )
        currentDate = newDate
      }
    }
    return messagesDates
  }
}

