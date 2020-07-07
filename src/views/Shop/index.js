import { connect } from "react-redux";
import {
  changeSubmitSwitch, closeViewCart, getAlertMessage,
  getCategory,
  getIsSubmit,
  getProducts,
  getShowMessage,
  getTotalCart,
  getViewCart,
  handle_request_close,
  loadTotalDay,
  loadView,
  openCart,
  closeCart
} from "../../modules/Shop";
import Shop from "./Shop";
import { startApp } from "../../modules/Admin/actions";

const mapStateFromProps = state => ({
  categories: getCategory(state),
  products: getProducts(state),
  totalCart: getTotalCart(state),
  isSubmit: getIsSubmit(state),
  alertMessage: getAlertMessage(state),
  showMessage: getShowMessage(state),
  openViewCart: getViewCart(state)
});

const mapDispatchFromProps = {
  changeSubmitSwitch,
  loadTotalDay,
  loadView,
  startApp,
  handle_request_close,
  openCart,
  closeCart
};

export default connect(mapStateFromProps, mapDispatchFromProps)(Shop);
