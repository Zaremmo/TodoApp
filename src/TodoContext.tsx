import { createContext, useContext, useReducer, useState } from "react";
import { ACTIONS } from "./TodosReducer";
import todosReducer from "./TodosReducer";
export type SingleTodo = {
  id: number;
  description: string;
  done: boolean;
  date: string;
  priority: string;
};
type ContextTypes = {
  todosList: SingleTodo[];
  currentTodo: SingleTodo | null;
  addTodo?: (params: SingleTodo) => void;
  updateTodo?: (params: SingleTodo) => void;
  setCurrentTodo?: (params: SingleTodo | null) => void;
  removeTodo?: (params: SingleTodo) => void;
};

const TodoContext = createContext<ContextTypes>({
  todosList: [],
  currentTodo: null,
});

const TodosContextProvider = (props: { children: JSX.Element }) => {
  const [todosList, dispatch] = useReducer(todosReducer, [] as SingleTodo[]);
  const [currentTodo, setCurrentTodo] = useState<SingleTodo | null>(null);

  function addTodo(todo: SingleTodo) {
    dispatch({
      type: ACTIONS.ADD,
      payload: todo,
    });
    setCurrentTodo(todo);
  }
  function updateTodo(todo: SingleTodo) {
    dispatch({
      type: ACTIONS.UPDATE,
      payload: todo,
    });
  }
  function removeTodo(todo: SingleTodo) {
    if (todo.id === currentTodo?.id) {
      setCurrentTodo(null);
    }
    dispatch({
      type: ACTIONS.REMOVE,
      payload: todo,
    });
  }

  return (
    <TodoContext.Provider
      value={{
        todosList,
        currentTodo,
        addTodo,
        updateTodo,
        removeTodo,
        setCurrentTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

const useTodoContext = () => {
  return useContext(TodoContext);
};

export { TodosContextProvider, useTodoContext };
