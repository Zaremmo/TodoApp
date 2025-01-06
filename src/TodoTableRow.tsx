import React from "react";
import { SingleTodo, useTodoContext } from "./TodoContext";
const PRIORITY_COLORS = {
  low: "text-success",
  medium: "text-warning",
  high: "text-error",
};

type TodoTableRowProps = {
  todo: SingleTodo;
  index: number;
};

function TodoTableRow(props: TodoTableRowProps) {
  const { todo, index } = props;
  const { setCurrentTodo, updateTodo, removeTodo } = useTodoContext();

  function handleEditTodo(todo: SingleTodo) {
    if (setCurrentTodo) {
      setCurrentTodo(todo);
    }
  }
  function handleMarkAsDone(todo: SingleTodo) {
    if (updateTodo)
      updateTodo({
        ...todo,
        done: true,
      });
  }
  function handleRemoveTodo(todo: SingleTodo) {
    if (removeTodo) removeTodo(todo);
  }
  return (
    <tr
      key={"todo" + todo.id}
      className="hover"
    >
      <th>{index + 1}</th>
      <td className={todo.done ? "line-through" : ""}>{todo.description}</td>
      <td>{todo.date}</td>
      <td
        className={
          PRIORITY_COLORS[
            todo.priority === "low" ||
            todo.priority === "medium" ||
            todo.priority === "high"
              ? todo.priority
              : "low"
          ]
        }
      >
        {todo.priority}
      </td>
      <td>
        <div className="join">
          {!todo.done ? (
            <>
              <button
                className="btn-xs btn btn-info join-item"
                onClick={() => handleEditTodo(todo)}
              >
                Edit
              </button>
              <button
                className="btn-xs btn btn-success join-item"
                onClick={() => handleMarkAsDone(todo)}
              >
                Done
              </button>
            </>
          ) : null}

          <button
            className="btn-xs btn btn-error join-item"
            onClick={() => handleRemoveTodo(todo)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TodoTableRow;
