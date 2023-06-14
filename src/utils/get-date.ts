import moment from "moment";

export const getDate = (curDate?: Date) => {
    const date = curDate || new Date();
    return moment(date).format('DD.MM.yyyy'); 
}
