import {
  TODO,
  NEW_TODO,
  UPDATE_TODO,
  PATCH_TODO,
  DELETE_TODO,
  SET_TODO_UPDATE,
  RESET_TODOS,
  RESET_TODO,
} from "./actions";
import { TodosState, ActionProps } from "../types/redux";

const initialState: TodosState = {
  todos: [],
  todo: null,
  todoUpdate: null,
};

export default function (state = initialState, action: ActionProps) {
  const { type, payload } = action;
  switch (type) {
    case TODO.API_REQUEST_ALL:
      return {
        ...state,
      };
    case TODO.API_SUCCESS_ALL:
      return {
        ...state,
        todos: payload.todos,
      };
    case TODO.API_REQUEST_ONE:
      return {
        ...state,
      };
    case TODO.API_SUCCESS_ONE:
      return {
        ...state,
        todo: payload.todo,
        todoUpdate: payload.todo,
      };

    case NEW_TODO:
      return {
        ...state,
        todos: payload.todos,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todo: payload.todo,
        todos: payload.todos,
      };
    case PATCH_TODO:
      return {
        ...state,
        todos: payload.todos,
        todo: payload.todo,
        todoUpdate: payload.todo,
      };
    case DELETE_TODO:
      return {
        ...state,
        todo: payload.todo,
        todos: payload.todos,
      };
    case SET_TODO_UPDATE:
      return {
        ...state,
        todoUpdate: payload.todo,
      };
    case RESET_TODOS:
      return {
        ...state,
        todos: [],
      };
    case RESET_TODO:
      return {
        ...state,
        todo: null,
        todoUpdate: null,
      };
    default:
      return state;
  }
}
