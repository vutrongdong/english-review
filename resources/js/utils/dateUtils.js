import moment from 'moment';

export const formatDateWithWeekday = (date, weekDay = null) => {
    const formatDate = checkFormat(date);
    if (!weekDay) {
        weekDay = new Date(formatDate).toLocaleDateString('ja-JP', {weekday: 'short'});
    }
    return `${moment(formatDate).format('YYYY.MM.DD')}（${weekDay}）`;
}

export const getDateYesterday = () => {
    return new Date(new Date().setDate(new Date().getDate()-1))
}

export const formatDate = (date) => {
    return (date) ? moment(date).format('YYYY-MM-DD') : null;
}

export const getTime = (date) => {
    return (date) ? moment(date).format('HH:mm') : null;
}

export const excelDateToJSDate = (date) => {
    return new Date(Math.round((date - 25569)*86400*1000));
}

const checkFormat = (date) => {
    const regex = /^(\d{4})\.(\d{1,2})\.(\d{1,2})$/;
    if(regex.test(date)) {
        return date.replace(/\./g, "/");
    }
    return date
}
