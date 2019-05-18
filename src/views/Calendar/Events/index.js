import { connect } from "react-redux";
import AddMaster from "./AddEvents";
import {
  getResource,
  getEvents,
  getTotalResource,
  changeMasters,
  editMastersStart,
  getTotalMasters,
  getIsDay
} from "../../../modules/Calendar";

const mapStateFromProps = state => ({
  resource: getResource(state),
  events: getEvents(state),
  masters: getTotalMasters(state),
  totalResource: getTotalResource(state)
});

const mapDispatchFromProps = { changeMasters, editMastersStart };

export default connect(mapStateFromProps, mapDispatchFromProps)(AddMaster);
