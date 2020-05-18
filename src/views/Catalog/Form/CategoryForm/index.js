import CategoryForm from "./CategoryForm";
import { connect } from "react-redux";
import { currentTodoNull } from "../../../../modules/Catalog/actions";
import { getErrorMessage, on_todo_update } from "../../../../modules/Catalog";

const mapStateFromProps = state => ({
  errorMessage: getErrorMessage(state)
});

const mapDispatchFromProps = {
  currentTodoNull,
  on_todo_update
};

export default connect(mapStateFromProps, mapDispatchFromProps)(CategoryForm);
