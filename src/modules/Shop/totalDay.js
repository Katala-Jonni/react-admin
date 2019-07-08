import moment from "moment/min/moment-with-locales";

export default {
  [moment()
    .set("date", 6)
    .format("DD.MM.YY")]: {}
};
