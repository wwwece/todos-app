import { GET_TODOS } from "./actions";
import { TodosState, ActionProps } from "../types/redux";

const initialState: TodosState = {
  todos: [],
};

export default function (state = initialState, action: ActionProps) {
  const { type, payload } = action;
  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
      };
    default:
      return state;
  }
}
