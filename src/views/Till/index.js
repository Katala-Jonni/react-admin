import { connect } from "react-redux";
import Till from "./Till";
import { getTotalDay, getTotalOrders } from "../../modules/Shop";
import { getTotalMasters } from "../../modules/Calendar";

const mapStateFromProps = state => ({
  totalDay: getTotalDay(state),
  totalOrders: getTotalOrders(state)
});

export default connect(mapStateFromProps, null)(Till);
