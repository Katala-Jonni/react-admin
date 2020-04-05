import {
  // addInTill,
  // endLockOpen,
  getAdministrators,
  // loadStateTill,
  // loadTill,
  // lockOpen,
  // openTill
  loadTill
} from "../../modules/Till";
import { loadTotalDay } from "../../modules/Shop";
import { getDay, loadApp, startApp, getError } from "../../modules/Admin";
import { connect } from "react-redux";
import { loadResource } from "../../modules/Calendar";
import App from "./App";

const mapStateFromProps = state => ({
  isDay: getDay(state),
  administrators: getAdministrators(state),
  isError: getError(state)
});

const mapDispatchFromProps = {
  // loadResource,
  // lockOpen,
  // endLockOpen,
  // loadTotalDay,
  // loadApp,
  // addInTill,
  loadTill,
  // openTill,
  // loadStateTill,
  startApp
};

export default connect(mapStateFromProps, mapDispatchFromProps)(App);
