import { useTodoContext } from "./TodoContext";
import TodoTableRow from "./TodoTableRow";

function TododsTable() {
  const { todosList } = useTodoContext();

  return (
    <div className="overflow-x-auto w-1/2">
      <table className="table table-lg w-full">
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
          {todosList.map((todo, index) => (
            <TodoTableRow
              todo={todo}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TododsTable;
