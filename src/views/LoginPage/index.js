import { connect } from "react-redux";
import LoginPage from "./LoginPage";
import { getIsAuthorized, getLoginStart, getStartLoader, startAuth } from "../../modules/Admin";

const mapStateFromProps = state => ({
  isAuthorized: getIsAuthorized(state),
  startLoader: getStartLoader(state)
});

const mapDispatchFromProps = {
  getLoginStart, startAuth
};

export default connect(mapStateFromProps, mapDispatchFromProps)(LoginPage);
