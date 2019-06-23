import { connect } from "react-redux";
import { getTotalResource } from "../../../modules/Calendar";
import { addToCart, getTotalCart } from "../../../modules/Shop";
import Card from "./Card";

const mapStateFromProps = state => ({
  totalResource: getTotalResource(state),
  totalCart: getTotalCart(state)
});

const mapDispatchFromProps = { addToCart };

export default connect(mapStateFromProps, mapDispatchFromProps)(Card);
