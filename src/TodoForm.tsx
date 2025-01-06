import { FormEvent } from "react";
import { useTodoContext } from "./TodoContext";
import { SingleTodo } from "./TodoContext";
function TodoForm() {
  const { currentTodo, addTodo, updateTodo } = useTodoContext();
  function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const formData = new FormData(formEvent.currentTarget);
    const description = formData.get("description")?.toString();
    const date = formData.get("date")?.toString();
    const priority = formData.get("priority")?.toString();
    if (
      !description?.length ||
      !date?.length ||
      !priority?.length ||
      !addTodo ||
      !updateTodo
    ) {
      return;
    }
    if (currentTodo) {
      updateTodo({
        id: currentTodo.id,
        description: description,
        date: date,
        done: false,
        priority: priority,
      });
    } else {
      addTodo({
        id: Date.now(),
        description: description,
        date: date,
        done: false,
        priority: priority,
      });
    }
  }
  return (
    <form
      className="flex flex-col w-1/2"
      onSubmit={handleSubmit}
    >
      <h3 className="mb-5">
        {currentTodo ? "Edit " + currentTodo.description : "Add new todo"}
      </h3>

      <input
        required
        type="text"
        placeholder="Task description"
        name="description"
        className="input input-bordered w-full max-w-lg mb-4"
        defaultValue={currentTodo?.description}
      />
      <input
        required
        type="date"
        placeholder="Task deadline"
        name="date"
        className="input input-bordered w-full max-w-lg mb-4"
        defaultValue={currentTodo?.date}
      />

      <select
        className="select select-bordered w-full max-w-lg mb-4"
        required
        name="priority"
        defaultValue={currentTodo?.priority}
      >
        <option
          disabled
          selected
        >
          Task priority
        </option>
        <option
          value="low"
          className="text-success"
        >
          Low
        </option>
        <option
          value="medium"
          className="text-warning"
        >
          Medium
        </option>
        <option
          value="high"
          className="text-error"
        >
          High
        </option>
      </select>
      <button
        type="submit"
        className="btn btn-primary max-w-xs"
      >
        Submit
      </button>
    </form>
  );
}
export default TodoForm;
