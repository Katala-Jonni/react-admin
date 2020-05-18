import React from "react";
import Chip from "@material-ui/core/Chip";
import { SortableElement } from "react-sortable-hoc";

const ToDoItem = SortableElement(({ todo, onTodoSelect, onTodoChecked, number, labels, categories, isCategory }) => {
  const label = labels.find((item) => item._id === todo.category);
  return (
    <div
      className="module-list-item"
      onClick={() => {
        onTodoSelect(todo);
      }}
    >
      <div className="module-list-info">
        <div className="row">
          <div className="module-todo-content col-9 col-sm-10 col-md-11">
            <div className={`subject ${todo.completed && "text-muted text-strikethrough"}`}>
              #{number + 1} {!isCategory ? todo.title : todo.value}
            </div>
            {!isCategory
              ? <div
                className={`badge text-white bg-${label.color}`}
              >
                {label.value}
              </div>
              : null
            }
          </div>
          <div className="module-todo-right col-3 col-sm-2 col-md-1">
            <div className="d-flex flex-row-reverse">
              <Chip
                label={!isCategory ? `${todo.price} ₽` : todo.product && todo.product.items && todo.product.items.length || 0}
                color={"primary"}
                variant={"outlined"}/>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
});

export default ToDoItem;
