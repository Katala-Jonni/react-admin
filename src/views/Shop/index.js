import { connect } from "react-redux";
import { changeSubmitSwitch, getIsSubmit, getTotalCart, loadTotalDay } from "../../modules/Shop";
import Shop from "./Shop";

const mapStateFromProps = state => ({
  totalCart: getTotalCart(state),
  isSubmit: getIsSubmit(state)
});

const mapDispatchFromProps = { changeSubmitSwitch, loadTotalDay };

export default connect(mapStateFromProps, mapDispatchFromProps)(Shop);
