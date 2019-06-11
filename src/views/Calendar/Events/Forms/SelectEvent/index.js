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

const mapStateFromProps = state => ({
  resource: getResource(state),
  events: getEvents(state),
  masters: getTotalMasters(state),
  totalResource: getTotalResource(state),
  formRedux: state.form.fieldArraysSelectEvents
});

const mapDispatchFromProps = { changeMasters, editMastersStart, editEvents };

export default connect(mapStateFromProps, mapDispatchFromProps)(SelectEvent);
