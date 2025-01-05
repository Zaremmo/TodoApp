import { SingleTodo, useTodoContext } from "./TodoContext";

const PRIORITY_COLORS = {
  low: "text-success",
  medium: "text-warning",
  high: "text-error",
};

function TododsTable() {
  const { todosList, setCurrentTodo } = useTodoContext();

  function handleEditTodo(todo: SingleTodo) {
    if (setCurrentTodo) {
      setCurrentTodo(todo);
    }
  }
  return (
    <div className="overflow-x-auto w-1/2">
      <table className="table table-lg w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Description</th>
            <th>Deadline Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todosList.map((todo, index) => {
            return (
              <tr
                key={"todo" + index}
                className="hover"
              >
                <th>{index + 1}</th>
                <td>{todo.description}</td>
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
                    <button
                      className="btn-xs btn btn-info join-item"
                      onClick={() => handleEditTodo(todo)}
                    >
                      Edit
                    </button>
                    <button className="btn-xs btn btn-success join-item">
                      Done
                    </button>

                    <button className="btn-xs btn btn-error join-item">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default TododsTable;
