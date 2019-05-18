import { connect } from "react-redux";
import Calendar from "./Calendar";
import {
  getResource,
  getEvents,
  getTotalResource,
  selectDay,
  deleteMasters,
  editEvents,
  loadResource,
  getWizard,
  openWizard,
  closeWizard
} from "../../modules/Calendar";

const mapStateFromProps = state => ({
  resource: getResource(state),
  events: getEvents(state),
  totalResource: getTotalResource(state),
  isWizardView: getWizard(state)
});

const mapDispatchFromProps = { selectDay, deleteMasters, editEvents, loadResource, openWizard, closeWizard };

export default connect(mapStateFromProps, mapDispatchFromProps)(Calendar);
