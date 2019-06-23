import { connect } from "react-redux";
import { getTotalCart, addToCart } from "../../../modules/Shop";
import CartTable from "./CartTable";

const mapStateFromProps = state => ({
  totalCart: getTotalCart(state)
});

const mapDispatchFromProps = { addToCart };

export default connect(mapStateFromProps, mapDispatchFromProps)(CartTable);
