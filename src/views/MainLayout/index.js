import { connect } from "react-redux";
import MainLayout from "./MainLayout";
import { getIsAuthorized } from "../../modules/Admin";

const mapStateFromProps = state => ({
  isAuthorized: getIsAuthorized(state)
});

const mapDispatchFromProps = {};

export default connect(mapStateFromProps, mapDispatchFromProps)(MainLayout);
