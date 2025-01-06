import { useState } from "react";
import { SingleTodo, useTodoContext } from "./TodoContext";
import TodoTableRow from "./TodoTableRow";

function TododsTable() {
  const { todosList } = useTodoContext();
  const [searchPharse, setsearchPharse] = useState<string>("");
  const [sortParam, setsortParam] = useState("name");

  function handleFilter(todo: SingleTodo) {
    if (searchPharse.length) {
      return todo.description.includes(searchPharse);
    } else {
      return true;
    }
  }

  function handleSort(a: SingleTodo, b: SingleTodo) {
    switch (sortParam) {
      case "name":
        return a.description.localeCompare(b.description);
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "priority":
        return a.priority - b.priority;
    }

    return 1;
  }

  return (
    <div className="overflow-x-auto ">
      <div className="flex lg:flex-row flex-col">
        <input
          type="text"
          placeholder="Search todo by description"
          className="input input-bordered input-sm w-full max-w-xs mb-4 me-4"
          onChange={(event) => {
            setsearchPharse(event.target.value.toString() ?? "");
          }}
        />
        <select
          className="select select-sm select-bordered w-full max-w-xs mb-4"
          value={sortParam}
        >
          <option value="name">Sort by name</option>
          <option value="date">Sort by date</option>
          <option value="priority">Sort by priority</option>
        </select>
      </div>

      <table className="table table-lg ">
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
          {todosList
            .filter(handleFilter)
            .sort(handleSort)
            .map((todo, index) => (
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
