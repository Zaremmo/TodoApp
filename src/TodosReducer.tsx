import { useReducer } from "react";

const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
};

function todosReducer(state: any, action: any) {
  console.log(state, action);

  switch (action.type) {
    case ACTIONS.ADD:
      console.log([...state, action.payload]);
      return [...state, action.payload];
    case ACTIONS.UPDATE:
      break;
    case ACTIONS.REMOVE:
      break;
    default:
      return state;
  }
}

export { ACTIONS };
export default todosReducer;
