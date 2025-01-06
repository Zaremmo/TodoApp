import { useEffect, useState } from "react";
import { useTodoContext } from "./TodoContext";

const newTodo = {
  id: Date.now(),
  description: "",
  date: new Date().toString(),
  done: false,
  priority: 1,
};

function TodoForm() {
  const { currentTodo, addTodo, updateTodo, setCurrentTodo } = useTodoContext();
  const [formData, setFormData] = useState(currentTodo ?? newTodo);
  function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    console.log(formData);

    if (currentTodo) {
      if (updateTodo) updateTodo(formData);
    } else {
      if (addTodo) addTodo(formData);
    }
  }
  function handleChange(
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLSelectElement>
  ) {
    const { value, name } = event.currentTarget;
    setFormData((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  }
  useEffect(() => {
    setFormData(currentTodo ?? newTodo);
  }, [currentTodo]);
  function handleReset() {
    if (setCurrentTodo) setCurrentTodo(null);
  }
  return (
    <form
      className="flex flex-col mt-5"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <button
        className="btn mb-4 w-fit btn-success"
        type="reset"
      >
        New todo
      </button>
      <h3 className="mb-5">
        {formData ? "Edit " + formData.description : "Add new todo"}
      </h3>

      <input
        required
        type="text"
        placeholder="Task description"
        name="description"
        className="input input-bordered w-full max-w-lg mb-4"
        value={formData?.description}
        onChange={handleChange}
      />
      <input
        required
        type="date"
        placeholder="Task deadline"
        name="date"
        className="input input-bordered w-full max-w-lg mb-4"
        value={formData?.date}
        onChange={handleChange}
      />

      <select
        className="select select-bordered w-full max-w-lg mb-4"
        required
        name="priority"
        value={formData?.priority}
        onChange={handleChange}
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
