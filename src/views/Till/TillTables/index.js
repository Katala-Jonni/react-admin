import { connect } from "react-redux";
import TillTables from "./TillTables";
// import { getTotalOrders } from "../../../modules/Shop";
import { getTotalMasters } from "../../../modules/Calendar";
import { getTotalDay, getTotalOrders } from "../../../modules/Till";

const mapStateFromProps = state => ({
  totalDay: getTotalDay(state),
  totalOrders: getTotalOrders(state),
  masters: getTotalMasters(state)
});

export default connect(mapStateFromProps, null)(TillTables);
