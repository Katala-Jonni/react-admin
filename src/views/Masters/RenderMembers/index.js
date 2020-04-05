import RenderMembers from "./RenderMembers";
import { connect } from "react-redux";
import { changeIgnoreMembers, deleteIgnoreMembers, getIgnoreMembers, getServices } from "../../../modules/Master";

const mapStateFromProps = state => ({
  services: getServices(state),
  ignoreMembers: getIgnoreMembers(state)
});

const mapDispatchFromProps = { changeIgnoreMembers, deleteIgnoreMembers };

export default connect(mapStateFromProps, mapDispatchFromProps)(RenderMembers);
