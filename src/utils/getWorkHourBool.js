import moment from "moment/min/moment-with-locales";

export default () => moment().hour() <= 21;
