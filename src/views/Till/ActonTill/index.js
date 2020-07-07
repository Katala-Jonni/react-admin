import { connect } from "react-redux";
import ActonTill from "./ActonTill";
import { getDay, getPlace } from "../../../modules/Admin";
import { getLastDay, startLastAdd, startLastDay } from "../../../modules/Till";


const mapStateFromProps = state => ({
  place: getPlace(state),
  lastDay: getLastDay(state),
  isDay: getDay(state)

});
//loadTill
const mapDispatchFromProps = {
  startLastAdd, startLastDay
};

export default connect(mapStateFromProps, mapDispatchFromProps)(ActonTill);
