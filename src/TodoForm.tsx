import { useTodoContext } from "./TodoContext";
function TodoForm() {
  const { currentTodo, addTodo, updateTodo, setCurrentTodo } = useTodoContext();
  function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const formData = new FormData(formEvent.currentTarget);
    const description = formData.get("description")?.toString();
    const date = formData.get("date")?.toString();
    const priorityValue = formData.get("priority")?.toString() ?? "1";
    const priority = parseInt(priorityValue);
    if (
      !description?.length ||
      !date?.length ||
      !priority ||
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
      className="flex flex-col mt-5"
      onSubmit={handleSubmit}
    >
      <button
        className="btn mb-4 w-fit btn-success"
        type="reset"
        onClick={() => {
          if (setCurrentTodo) {
            setCurrentTodo(null);
          }
        }}
      >
        New todo
      </button>
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
          value="1"
          className="text-success"
        >
          Low
        </option>
        <option
          value="2"
          className="text-warning"
        >
          Medium
        </option>
        <option
          value="3"
          className="text-error"
        >
          High
        </option>
      </select>
      <button
        type="submit"
        className="btn btn-primary w-fit"
      >
        Submit
      </button>
    </form>
  );
}
export default TodoForm;
