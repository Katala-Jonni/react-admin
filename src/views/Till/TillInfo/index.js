import { connect } from "react-redux";
import TillInfo from "./TillInfo";
import {
  getInTill,
  getInTillSum,
  getOutTill,
  getOutTillSum,
  // loadTill,
  loadInfoTill,
  getRevenue,
  getIncome,
  getPaymentByCard
} from "../../../modules/Till";
import { getTotalDay, getTotalOrders, startRemoveDay } from "../../../modules/Shop";

const mapStateFromProps = state => ({
  inTill: getInTill(state),
  outTill: getOutTill(state),
  inTillSum: getInTillSum(state),
  outTillSum: getOutTillSum(state),
  totalDay: getTotalDay(state),
  totalOrders: getTotalOrders(state),
  paymentByCard: getPaymentByCard(state),
  revenue: getRevenue(state),
  income: getIncome(state)
});
//loadTill
const mapDispatchFromProps = { loadInfoTill, startRemoveDay };

export default connect(mapStateFromProps, mapDispatchFromProps)(TillInfo);
