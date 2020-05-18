import ProductForm from "./ProductForm";
import { connect } from "react-redux";
import {
  changeIgnoreMembers,
  deleteIgnoreMembers,
  getIgnoreMembers,
  getReset
} from "../../../../modules/Catalog/index";
import { currentTodoNull, reduxResetForm } from "../../../../modules/Catalog/actions";
import { getProducts } from "../../../../modules/Shop";
import { getErrorMessage, getLoaderForm, on_todo_update } from "../../../../modules/Catalog";

const mapStateFromProps = state => ({
  // ignoreMembers: getIgnoreMembers(state)
  resetForm: getReset(state),
  products: getProducts(state),
  errorMessage: getErrorMessage(state),
  loaderForm: getLoaderForm(state)
});

const mapDispatchFromProps = {
  changeIgnoreMembers,
  deleteIgnoreMembers,
  reduxResetForm,
  currentTodoNull,
  on_todo_update
};

export default connect(mapStateFromProps, mapDispatchFromProps)(ProductForm);
