import { connect } from "react-redux";
import {
  getTotalCart,
  startSendCart,
  getTotalDay,
  getIsSubmit,
  getTotalOrders,
  addToCartStart
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
  certificate: naturalCertificate(state)
});

const mapDispatchFromProps = { addToCartStart, startSendCart, endSearchNumber, deleteState };

export default connect(mapStateFromProps, mapDispatchFromProps)(CartTable);
