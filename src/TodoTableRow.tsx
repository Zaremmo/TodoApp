import { SingleTodo, useTodoContext } from "./TodoContext";

type TodoTableRowProps = {
  todo: SingleTodo;
  index: number;
};
const PRIORITY_LEVELS = ["low", "medium", "high"];
const PRIORITY_COLORS = ["text-success", "text-warning", "text-error"];

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
      <td className={PRIORITY_COLORS[todo.priority - 1]}>
        {PRIORITY_LEVELS[todo.priority - 1]}
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
