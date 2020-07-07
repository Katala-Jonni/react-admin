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
  getPay,
  startAddDay
  // getPaymentByCard
} from "../../../modules/Till";
import { getTotalDay, getTotalOrders, startRemoveDay } from "../../../modules/Shop";
import { getPlace } from "../../../modules/Admin";

const mapStateFromProps = state => ({
  inTill: getInTill(state),
  outTill: getOutTill(state),
  inTillSum: getInTillSum(state),
  outTillSum: getOutTillSum(state),
  totalDay: getTotalDay(state),
  totalOrders: getTotalOrders(state),
  // paymentByCard: getPaymentByCard(state),
  revenue: getRevenue(state),
  income: getIncome(state),
  pay: getPay(state),
  place: getPlace(state)
});
//loadTill
const mapDispatchFromProps = { loadInfoTill, startRemoveDay, startAddDay };

export default connect(mapStateFromProps, mapDispatchFromProps)(TillInfo);
