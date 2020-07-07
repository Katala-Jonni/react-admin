import {
  getLastDay,
  // addInTill,
  // endLockOpen,
  // getAdministrators,
  // loadStateTill,
  // loadTill,
  // lockOpen,
  // openTill
  loadTill
} from "../../modules/Till";
import { loadTotalDay } from "../../modules/Shop";
import {
  getDay,
  loadApp,
  startApp,
  getError,
  getAdministrators,
  getPlace,
  getAlertMessage,
  getShowMessage, handle_request_close
} from "../../modules/Admin";
import { connect } from "react-redux";
import { loadResource } from "../../modules/Calendar";
import App from "./App";

const mapStateFromProps = state => ({
  isDay: getDay(state),
  administrators: getAdministrators(state),
  isError: getError(state),
  place: getPlace(state),
  alertMessage: getAlertMessage(state),
  showMessage: getShowMessage(state),
  lastDay: getLastDay(state),
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
  startApp,
  handle_request_close
};

export default connect(mapStateFromProps, mapDispatchFromProps)(App);
