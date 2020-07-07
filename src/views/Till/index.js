import { connect } from "react-redux";
import Till from "./Till";
import { getTotalOrders } from "../../modules/Shop";
import { getPay, getTillInfoView, startLoadDay } from "../../modules/Till";
import { changeTill, getTotalDay } from "../../modules/Till";

const mapStateFromProps = state => ({
  totalDay: getTotalDay(state),
  totalOrders: getTotalOrders(state),
  tillInfoView: getTillInfoView(state),
  pay: getPay(state)
});

const mapDispatchFromProps = { changeTill, startLoadDay };

export default connect(mapStateFromProps, mapDispatchFromProps)(Till);
