import { createContext, useContext, useReducer, useState } from "react";
import { ACTIONS } from "./TodosReducer";
import todosReducer from "./TodosReducer";
export type SingleTodo = {
  id: number;
  description: string;
  done: boolean;
  date: string;
  priority: number;
};
type ContextTypes = {
  todosList: SingleTodo[];
  currentTodo: SingleTodo | null;
  toastMessage: string | null;
  addTodo?: (params: SingleTodo) => void;
  updateTodo?: (params: SingleTodo) => void;
  setCurrentTodo?: (params: SingleTodo | null) => void;
  removeTodo?: (params: SingleTodo) => void;
  createNewTodo?: () => void;
};

const TodoContext = createContext<ContextTypes>({
  todosList: [],
  currentTodo: null,
  toastMessage: null,
});

const TodosContextProvider = (props: { children: JSX.Element }) => {
  const [todosList, dispatch] = useReducer(todosReducer, [] as SingleTodo[]);
  const [currentTodo, setCurrentTodo] = useState<SingleTodo | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function delayedToastHide(delay = 5000) {
    setTimeout(() => {
      setToastMessage(null);
    }, delay);
  }

  function addTodo(todo: SingleTodo) {
    dispatch({
      type: ACTIONS.ADD,
      payload: todo,
    });
    setCurrentTodo(todo);
    setToastMessage("New todo added.");
    delayedToastHide();
  }
  function updateTodo(todo: SingleTodo) {
    dispatch({
      type: ACTIONS.UPDATE,
      payload: todo,
    });
    setToastMessage("Todo updated.");
    delayedToastHide();
  }
  function removeTodo(todo: SingleTodo) {
    if (todo.id === currentTodo?.id) {
      setCurrentTodo(null);
    }
    dispatch({
      type: ACTIONS.REMOVE,
      payload: todo,
    });
    setToastMessage("Todo removed.");
    delayedToastHide();
  }
  function createNewTodo() {
    setCurrentTodo(null);
  }
  return (
    <TodoContext.Provider
      value={{
        todosList,
        currentTodo,
        toastMessage,
        addTodo,
        updateTodo,
        removeTodo,
        setCurrentTodo,
        createNewTodo,
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
