import { connect } from "react-redux";
import ResultTable from "./ResultTable";
import {
  getCash, getIncome,
  getInTill,
  getInTillSum,
  getOutTill,
  getOutTillCategory,
  getOutTillSum, getPaymentByCard, getRevenue, getTillInfoView,
  loadInfoTill
} from "../../../modules/Till";
import { getTotalDay } from "../../../modules/Shop";

const mapStateFromProps = state => ({
  inTill: getInTill(state),
  outTill: getOutTill(state),
  inTillSum: getInTillSum(state),
  outTillSum: getOutTillSum(state),
  cash: getCash(state),
  paymentByCard: getPaymentByCard(state),
  revenue: getRevenue(state),
  income: getIncome(state),
  outTillCategory: getOutTillCategory(state),
  totalDay: getTotalDay(state)
});

const mapDispatchFromProps = { loadInfoTill };

export default connect(mapStateFromProps, mapDispatchFromProps)(ResultTable);
