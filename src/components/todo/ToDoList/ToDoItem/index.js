import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { SortableElement, SortableHandle } from "react-sortable-hoc";

import labels from "../../../../modules/Master/labels";
import users from "../../../../modules/Master/users";

// This can be any component you want
const DragHandle = SortableHandle(() =>
  <i className="zmdi zmdi-menu draggable-icon d-none d-sm-flex" style={{ fontSize: 25 }}/>);


const ToDoItem = SortableElement(({ todo, onTodoSelect, onTodoChecked, number }) => {
  // console.log(number);
  let user = null;
  // if (todo.user > 0)
  //   user = users[todo.user - 1];
  return (
    <div
      className="module-list-item"
      onClick={() => {
        onTodoSelect(todo);
      }}
    >
      {/*<DragHandle/>*/}
      {/*<Checkbox*/}
      {/*checked={todo.selected}*/}
      {/*onClick={(event) => {*/}
      {/*event.stopPropagation();*/}
      {/*onTodoChecked(todo);*/}
      {/*}}*/}
      {/*value="SelectTodo"*/}
      {/*/>*/}

      <div className="module-list-info">
        <div className="row">
          <div className="module-todo-content col-9 col-sm-10 col-md-11">
            <div className={`subject ${todo.completed && "text-muted text-strikethrough"}`}>
              #{number + 1} {`${todo.surname} ${todo.name} ${todo.middleName}`}
            </div>
            <div className={`subject ${todo.completed && "text-muted text-strikethrough"}`}>
              Номер телефона: {todo.phone}
            </div>
            <div className="manage-margin">
              {todo.labels.map((label, index) => {
                // return (todo.labels).includes(label._id) &&
                return (
                  <div
                    key={index}
                    className={`badge text-white bg-${label.color}`}
                  >
                    {label.title}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="module-todo-right col-3 col-sm-2 col-md-1">
            <div className="d-flex flex-row-reverse">
              {!todo.avatar
                ? <Avatar>U</Avatar>
                : <Avatar
                  alt={`${todo.surname} ${todo.name} ${todo.middleName}`}
                  src={todo.avatar}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>

  );
});

export default ToDoItem;
