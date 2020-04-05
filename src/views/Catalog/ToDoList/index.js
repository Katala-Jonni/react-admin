import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import ToDoItem from "./ToDoItem";

const ToDoList = SortableContainer(({ toDos, onTodoSelect, onTodoChecked, labels }) => {
  return (
    <div className="module-list">
      <div className="module-list-scroll">
        {toDos.map((todo, index) => {
            return (
              <ToDoItem
                key={todo._id}
                index={index}
                labels={labels}
                number={index}
                todo={todo}
                onTodoSelect={onTodoSelect}
                onTodoChecked={onTodoChecked}
              />
            );
          }
        )}
      </div>
    </div>
  );
});

export default ToDoList;
