import { connect } from "react-redux";
import Member from "./Member";
import { getServices } from "../../../modules/Master";

const mapStateFromProps = state => ({
  // services: getServices(state)
});

// const mapDispatchFromProps = { null };

export default connect(mapStateFromProps, null)(Member);
