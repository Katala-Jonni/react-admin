import { connect } from "react-redux";
import {
  getTotalCart,
  addToCart,
  startSendCart,
  getTotalDay,
  getIsSubmit,
  getTotalOrders
} from "../../../modules/Shop";
import {
  endSearchNumber
} from "../../../modules/Certificate";
import CartTable from "./CartTable";
import { getTotalMasters } from "../../../modules/Calendar";

const mapStateFromProps = state => ({
  totalCart: getTotalCart(state),
  totalDay: getTotalDay(state),
  totalOrders: getTotalOrders(state),
  masters: getTotalMasters(state),
  isSubmit: getIsSubmit(state)
});

const mapDispatchFromProps = { addToCart, startSendCart, endSearchNumber };

export default connect(mapStateFromProps, mapDispatchFromProps)(CartTable);
