import { useState } from "react";
import { SingleTodo, useTodoContext } from "./TodoContext";
import TodoTableRow from "./TodoTableRow";

function TododsTable() {
  const { todosList } = useTodoContext();
  const [searchPharse, setsearchPharse] = useState<string>("");
  const [sortParam, setsortParam] = useState("date");
  const [isSortAscending, setIsSortAscending] = useState<boolean>(true);

  function handleFilter(todo: SingleTodo) {
    if (searchPharse.length) {
      return todo.description.includes(searchPharse);
    } else {
      return true;
    }
  }

  function handleSort(a: SingleTodo, b: SingleTodo) {
    let firstParam;
    let secondParam;
    if (isSortAscending) {
      firstParam = a;
      secondParam = b;
    } else {
      firstParam = b;
      secondParam = a;
    }
    switch (sortParam) {
      case "name":
        return firstParam.description.localeCompare(secondParam.description);
      case "date":
        return (
          new Date(firstParam.date).getTime() -
          new Date(secondParam.date).getTime()
        );
      case "priority":
        return firstParam.priority - secondParam.priority;
      default:
        return (
          new Date(firstParam.date).getTime() -
          new Date(secondParam.date).getTime()
        );
    }
  }
  function clearSearchPhrase() {
    setsearchPharse("");
  }

  return (
    <div className="overflow-x-auto ">
      <div className="flex flex-wrap justify-between ">
        <div className="join w-full max-w-sm mb-4 me-4">
          <input
            type="text"
            placeholder="Search todo by description"
            className="input w-full input-bordered input-sm  join-item"
            onChange={(event) => {
              setsearchPharse(event.target.value.toString() ?? "");
            }}
            value={searchPharse}
          />
          <button
            className="btn btn-outline btn-sm join-item"
            onClick={clearSearchPhrase}
          >
            Clear
          </button>
        </div>
        <div className="join w-full max-w-xs mb-4">
          <select
            className="select w-full select-sm select-bordered join-item"
            value={sortParam}
            onChange={(event) => {
              setsortParam(event.target.value);
            }}
          >
            <option value="name">Sort by description</option>
            <option value="date">Sort by date</option>
            <option value="priority">Sort by priority</option>
          </select>
          <button
            className="btn btn-outline btn-sm join-item "
            onClick={() => setIsSortAscending((state) => !state)}
          >
            {isSortAscending ? (
              <span className="text-lg">&#8593;</span>
            ) : (
              <span className="text-lg">&#8595;</span>
            )}
          </button>
        </div>
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
