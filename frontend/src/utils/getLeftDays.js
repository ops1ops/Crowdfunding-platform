import * as moment from 'moment';

export default (date) => {
    return moment(date).diff(moment(), 'days');
};