import moment from 'moment-timezone';

export const getFormatedTimeFromSeconds = (time, format) => {
    moment.tz.setDefault('UTC');
    const dateInAsiaKolkata = moment.unix(time).tz('Asia/Kolkata');
    return dateInAsiaKolkata.format(format)
}
