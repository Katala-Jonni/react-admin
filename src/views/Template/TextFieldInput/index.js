import TextFieldInput from "./TextFieldInput";
import { connect } from "react-redux";
import { changeType, getCash } from "../../../modules/Template";

const mapStateFromProps = state => ({});

const mapDispatchFromProps = { changeType };

export default connect(mapStateFromProps, mapDispatchFromProps)(TextFieldInput);
