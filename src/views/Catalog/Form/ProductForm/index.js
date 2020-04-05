import ProductForm from "./ProductForm";
import { connect } from "react-redux";
import {
  changeIgnoreMembers,
  deleteIgnoreMembers,
  getIgnoreMembers,
  getReset
} from "../../../../modules/Catalog/index";
import { reduxResetForm } from "../../../../modules/Catalog/actions";

const mapStateFromProps = state => ({
  // ignoreMembers: getIgnoreMembers(state)
  resetForm: getReset(state)
});

const mapDispatchFromProps = { changeIgnoreMembers, deleteIgnoreMembers, reduxResetForm };

export default connect(mapStateFromProps, mapDispatchFromProps)(ProductForm);
