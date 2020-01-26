import { connect } from "react-redux";
import SelectEvent from "./SelectEvent";
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
} from "../../../../../modules/Calendar";
import { deleteEvents } from "../../../../../modules/Calendar/actions";

const mapStateFromProps = state => ({
  resource: getResource(state),
  events: getEvents(state),
  masters: getTotalMasters(state),
  totalResource: getTotalResource(state),
  formRedux: state.form.fieldArraysSelectEvents
});

const mapDispatchFromProps = { changeMasters, editMastersStart, editEvents, deleteEvents, updateEvents, addEvents };

export default connect(mapStateFromProps, mapDispatchFromProps)(SelectEvent);
