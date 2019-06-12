import { connect } from "react-redux";
import SelectEvent from "./SelectEvent";
import {
  getResource,
  getEvents,
  getTotalResource,
  changeMasters,
  editMastersStart,
  getTotalMasters,
  getIsDay,
  editEvents
} from "../../../../../modules/Calendar";
import { deleteEvents } from "../../../../../modules/Calendar/actions";

const mapStateFromProps = state => ({
  resource: getResource(state),
  events: getEvents(state),
  masters: getTotalMasters(state),
  totalResource: getTotalResource(state),
  formRedux: state.form.fieldArraysSelectEvents
});

const mapDispatchFromProps = { changeMasters, editMastersStart, editEvents, deleteEvents };

export default connect(mapStateFromProps, mapDispatchFromProps)(SelectEvent);
