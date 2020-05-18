import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui components
import ToDoList from "../ToDoList";
import ToDoDetail from "../ToDoDetail";

class Editable extends Component {

  render() {
    const { currentTodo, toDos, conversation, user, masters, loadLabel, labels } = this.props;
    return currentTodo === null ?
      <ToDoList
        toDos={toDos || []}
        // toDos={masters}
        labels={labels}
        onSortEnd={this.onSortEnd}
        onTodoSelect={this.onTodoSelect.bind(this)}
        onTodoChecked={this.onTodoChecked.bind(this)}
        useDragHandle={true}
      />
      : <ToDoDetail
        todo={currentTodo}
        user={user}
        labels={labels}
        loadLabel={loadLabel}
        conversation={conversation}
        onLabelUpdate={this.onLabelUpdate.bind(this)}
        onToDoUpdate={this.onToDoUpdate.bind(this)}
        onDeleteToDo={this.onDeleteToDo.bind(this)}
      />;
  }
}

export default Editable;
