import { connect } from "react-redux";
import TillInfo from "./TillInfo";
import { getInTill, getInTillSum, getOutTill, getOutTillSum, loadTill, loadInfoTill } from "../../../modules/Till";

const mapStateFromProps = state => ({
  inTill: getInTill(state),
  outTill: getOutTill(state),
  inTillSum: getInTillSum(state),
  outTillSum: getOutTillSum(state)
});

const mapDispatchFromProps = { loadTill, loadInfoTill };

export default connect(mapStateFromProps, mapDispatchFromProps)(TillInfo);
