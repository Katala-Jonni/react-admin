import { connect } from "react-redux";
import AddEvents from "./AddEvents";
import {
  getResource,
  getEvents,
  getTotalResource,
  changeMasters,
  editMastersStart,
  getTotalMasters,
  editEvents,
  updateEvents,
  addEvents
} from "../../../modules/Calendar";
import { getPlace } from "../../../modules/Admin";

const mapStateFromProps = state => ({
  resource: getResource(state),
  events: getEvents(state),
  masters: getTotalMasters(state),
  totalResource: getTotalResource(state),
  place: getPlace(state)
});

const mapDispatchFromProps = { changeMasters, editMastersStart, editEvents, updateEvents, addEvents };

export default connect(mapStateFromProps, mapDispatchFromProps)(AddEvents);
