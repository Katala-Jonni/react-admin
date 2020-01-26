import { connect } from "react-redux";
import Calendar from "./Calendar";
import {
  getResource,
  getEvents,
  getTotalResource,
  getCurrentEvents,
  selectDay,
  deleteMasters,
  editEvents,
  loadResource,
  selectViewEvents,
  updateEvents,
  getDefaultResource, initialResource
} from "../../modules/Calendar";

const mapStateFromProps = state => ({
  resource: getResource(state),
  events: getEvents(state),
  totalResource: getTotalResource(state),
  currentEvents: getCurrentEvents(state),
  defaultResource: getDefaultResource(state)
});

const mapDispatchFromProps = { selectDay, deleteMasters, editEvents, loadResource, selectViewEvents, updateEvents,
  initialResource };

export default connect(mapStateFromProps, mapDispatchFromProps)(Calendar);
