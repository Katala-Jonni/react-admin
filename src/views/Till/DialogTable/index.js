import { connect } from "react-redux";
import DialogTable from "./DialogTable";
import {
  addInTill,
  addOutTill,
  getInTill, getInTillSum,
  getOutTill,
  getOutTillCategory,
  getOutTillSum
  // loadTill
} from "../../../modules/Till";

const mapStateFromProps = state => ({
  inTill: getInTill(state),
  outTill: getOutTill(state),
  inTillSum: getInTillSum(state),
  outTillSum: getOutTillSum(state),
  outTillCategory: getOutTillCategory(state)
});
//loadTill
const mapDispatchFromProps = { addInTill, addOutTill };

export default connect(mapStateFromProps, mapDispatchFromProps)(DialogTable);
