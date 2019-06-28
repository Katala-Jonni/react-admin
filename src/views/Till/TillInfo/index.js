import { connect } from "react-redux";
import TillInfo from "./TillInfo";
import { getInTill, getOutTill, loadTill } from "../../../modules/Till";

const mapStateFromProps = state => ({
  inTill: getInTill(state),
  outTill: getOutTill(state)
});

const mapDispatchFromProps = { loadTill };

export default connect(mapStateFromProps, mapDispatchFromProps)(TillInfo);
