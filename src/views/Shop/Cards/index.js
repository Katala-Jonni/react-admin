import { connect } from "react-redux";
import { getTotalResource } from "../../../modules/Calendar";
import { addToCartStart, getCategory, getTotalCart } from "../../../modules/Shop";
import Card from "./Card";

const mapStateFromProps = state => ({
  totalResource: getTotalResource(state),
  totalCart: getTotalCart(state),
  categories: getCategory(state)
});

const mapDispatchFromProps = { addToCartStart };

export default connect(mapStateFromProps, mapDispatchFromProps)(Card);
