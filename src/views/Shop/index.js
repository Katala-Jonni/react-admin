import { connect } from "react-redux";
import { getTotalCart } from "../../modules/Shop";
import Shop from "./Shop";

const mapStateFromProps = state => ({
  totalCart: getTotalCart(state)
});

// const mapDispatchFromProps = { addToCart };

export default connect(mapStateFromProps, null)(Shop);
