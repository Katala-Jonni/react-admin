import MasterForm from "./Form";
import { connect } from "react-redux";
import {
  changeIgnoreMembers,
  deleteIgnoreMembers,
  getErrorMessage,
  getIgnoreMembers, getLoaderForm,
  getReset,
  on_todo_update
} from "../../../modules/Master";
import { reduxResetForm } from "../../../modules/Master/actions";

const mapStateFromProps = state => ({
  // ignoreMembers: getIgnoreMembers(state)
  resetForm: getReset(state),
  errorMessage: getErrorMessage(state),
});

const mapDispatchFromProps = { changeIgnoreMembers, deleteIgnoreMembers, reduxResetForm, on_todo_update };

export default connect(mapStateFromProps, mapDispatchFromProps)(MasterForm);
