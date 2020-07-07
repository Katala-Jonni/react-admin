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
import { getPlace } from "../../../modules/Admin";

const mapStateFromProps = state => ({
  inTill: getInTill(state),
  outTill: getOutTill(state),
  inTillSum: getInTillSum(state),
  outTillSum: getOutTillSum(state),
  outTillCategory: getOutTillCategory(state),
  place: getPlace(state)
});
//loadTill
const mapDispatchFromProps = { addInTill, addOutTill };

export default connect(mapStateFromProps, mapDispatchFromProps)(DialogTable);
