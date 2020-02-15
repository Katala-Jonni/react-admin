import { connect } from "react-redux";
import {
  changeSubmitSwitch,
  getCategory,
  getIsSubmit,
  getProducts,
  getTotalCart,
  loadTotalDay,
  loadView
} from "../../modules/Shop";
import Shop from "./Shop";

const mapStateFromProps = state => ({
  categories: getCategory(state),
  products: getProducts(state),
  totalCart: getTotalCart(state),
  isSubmit: getIsSubmit(state)
});

const mapDispatchFromProps = { changeSubmitSwitch, loadTotalDay, loadView };

export default connect(mapStateFromProps, mapDispatchFromProps)(Shop);
