import { connect } from "react-redux";
import ResultTable from "./ResultTable";
import {
  getCash, getExpense, getIncome,
  getInTill,
  getInTillSum,
  getOutTill,
  getOutTillCategory,
  getOutTillSum, getPayCategory, getPaymentByCard, getRevenue, getTill, getTillInfoView, getTotalDay, getTotalOrders,
  loadInfoTill
} from "../../../modules/Till";
// import { getTotalOrders } from "../../../modules/Shop";

const mapStateFromProps = state => ({
  inTill: getInTill(state),
  outTill: getOutTill(state),
  inTillSum: getInTillSum(state),
  outTillSum: getOutTillSum(state),
  // cash: getCash(state),
  // paymentByCard: getPaymentByCard(state),
  revenue: getRevenue(state),
  income: getIncome(state),
  outTillCategory: getOutTillCategory(state),
  totalDay: getTotalDay(state),
  totalOrders: getTotalOrders(state),
  payCategory: getPayCategory(state),
  till: getTill(state),
  expense: getExpense(state)
});

const mapDispatchFromProps = { loadInfoTill };

export default connect(mapStateFromProps, mapDispatchFromProps)(ResultTable);
