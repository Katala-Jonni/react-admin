import { connect } from "react-redux";
import Calendar from "./Calendar";
import {
  getResource,
  getEvents,
  getTotalResource,
  selectDay,
  deleteMasters,
  editEvents,
  loadResource
} from "../../modules/Calendar";

const mapStateFromProps = state => ({
  resource: getResource(state),
  events: getEvents(state),
  totalResource: getTotalResource(state)
});

const mapDispatchFromProps = { selectDay, deleteMasters, editEvents, loadResource };

export default connect(mapStateFromProps, mapDispatchFromProps)(Calendar);
