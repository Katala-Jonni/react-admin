import { connect } from "react-redux";
import AddMaster from "./AddMaster";
import {
  getResource,
  getEvents,
  getTotalResource,
  changeMasters,
  editMastersStart,
  getTotalMasters,
  addResource,
  updateResource
} from "../../../modules/Calendar";
import { getPlace } from "../../../modules/Admin";

const mapStateFromProps = state => ({
  resource: getResource(state),
  events: getEvents(state),
  masters: getTotalMasters(state),
  totalResource: getTotalResource(state),
  place: getPlace(state)
});

const mapDispatchFromProps = { changeMasters, editMastersStart, addResource, updateResource };

export default connect(mapStateFromProps, mapDispatchFromProps)(AddMaster);
