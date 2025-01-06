import { SingleTodo } from "./TodoContext";

const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
};

function todosReducer(
  state: any,
  action: { type: string; payload: SingleTodo }
) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, action.payload];
    case ACTIONS.UPDATE:
      return state.map((todo: SingleTodo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        } else {
          return todo;
        }
      });

    case ACTIONS.REMOVE:
      return state.filter((todo: SingleTodo) => todo.id !== action.payload.id);

    default:
      return state;
  }
}

export { ACTIONS };
export default todosReducer;
