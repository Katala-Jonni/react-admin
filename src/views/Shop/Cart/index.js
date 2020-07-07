import { connect } from "react-redux";
import {
  getTotalCart,
  startSendCart,
  getTotalDay,
  getIsSubmit,
  getTotalOrders,
  addToCartStart,
  getErrorMessage,
  getAlertMessage,
  getShowMessage, handle_request_close
} from "../../../modules/Shop";
import {
  deleteState,
  endSearchNumber, getCertificate as naturalCertificate
} from "../../../modules/Certificate";
import CartTable from "./CartTable";
import { getTotalMasters } from "../../../modules/Calendar";

const mapStateFromProps = state => ({
  totalCart: getTotalCart(state),
  totalDay: getTotalDay(state),
  totalOrders: getTotalOrders(state),
  masters: getTotalMasters(state),
  isSubmit: getIsSubmit(state),
  certificate: naturalCertificate(state),
  errorMessage: getErrorMessage(state)
});

const mapDispatchFromProps = { addToCartStart, startSendCart, endSearchNumber, deleteState, handle_request_close };

export default connect(mapStateFromProps, mapDispatchFromProps)(CartTable);
