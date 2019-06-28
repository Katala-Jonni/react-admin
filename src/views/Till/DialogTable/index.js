import { connect } from "react-redux";
import DialogTable from "./DialogTable";
import { addInTill, addOutTill, getInTill, getOutTill, loadTill } from "../../../modules/Till";

const mapStateFromProps = state => ({
  inTill: getInTill(state),
  outTill: getOutTill(state)
});

const mapDispatchFromProps = { loadTill, addInTill, addOutTill };

export default connect(mapStateFromProps, mapDispatchFromProps)(DialogTable);
