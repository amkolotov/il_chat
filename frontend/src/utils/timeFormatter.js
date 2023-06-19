import moment from "moment";

export const timeFormatter = (date) => {
    return moment(date).local().format("HH:mm")
}
