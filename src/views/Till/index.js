import { connect } from "react-redux";
import Till from "./Till";
import { getTotalDay, getTotalOrders } from "../../modules/Shop";
import { getTillInfoView } from "../../modules/Till";
import { changeTill } from "../../modules/Till/actions";

const mapStateFromProps = state => ({
  totalDay: getTotalDay(state),
  totalOrders: getTotalOrders(state),
  tillInfoView: getTillInfoView(state)
});

const mapDispatchFromProps = { changeTill };

export default connect(mapStateFromProps, mapDispatchFromProps)(Till);
