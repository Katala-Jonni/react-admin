import { connect } from "react-redux";
import TillTables from "./TillTables";
import { getTotalDay, getTotalOrders } from "../../../modules/Shop";
import { getTotalMasters } from "../../../modules/Calendar";

const mapStateFromProps = state => ({
  totalDay: getTotalDay(state),
  totalOrders: getTotalOrders(state),
  masters: getTotalMasters(state)
});

export default connect(mapStateFromProps, null)(TillTables);
