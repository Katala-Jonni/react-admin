import { connect } from "react-redux";
import { changeSubmitSwitch, getIsSubmit, getTotalCart } from "../../modules/Shop";
import Shop from "./Shop";

const mapStateFromProps = state => ({
  totalCart: getTotalCart(state),
  isSubmit: getIsSubmit(state)
});

const mapDispatchFromProps = { changeSubmitSwitch };

export default connect(mapStateFromProps, mapDispatchFromProps)(Shop);
