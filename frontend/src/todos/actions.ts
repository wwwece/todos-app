import { TodoProps, TodoPatchProps } from "../types/todos";
import TodoAPI from "../services/todoAPI";
import { AppThunk } from "../types/redux";
import { store } from "../App";

export const TODOS = {};

export const TODO = {
  API_REQUEST_ALL: "TODO_API_REQUEST_ALL",
  API_SUCCESS_ALL: "TODO_API_SUCCESS_ALL",
  API_FAILURE_ALL: "TODO_API_FAILURE_ALL",
  API_REQUEST_ONE: "TODO_API_REQUEST_ONE",
  API_SUCCESS_ONE: "TODO_API_SUCCESS_ONE",
  API_FAILURE_ONE: "TODO_API_FAILURE_ONE",
  API_REQUEST_CREATE: "TODO_API_REQUEST_CREATE",
  API_SUCCESS_CREATE: "TODO_API_SUCCESS_CREATE",
  API_FAILURE_CREATE: "TODO_API_FAILURE_CREATE",
  API_REQUEST_UPDATE: "TODO_API_REQUEST_UPDATE",
  API_SUCCESS_UPDATE: "TODO_API_SUCCESS_UPDATE",
  API_FAILURE_UPDATE: "TODO_API_FAILURE_UPDATE",
  API_REQUEST_PATCH: "TODO_API_REQUEST_PATCH",
  API_SUCCESS_PATCH: "TODO_API_SUCCESS_PATCH",
  API_FAILURE_PATCH: "TODO_API_FAILURE_PATCH",
  API_REQUEST_DELETE: "TODO_API_REQUEST_DELETE",
  API_SUCCESS_DELETE: "TODO_API_SUCCESS_DELETE",
  API_FAILURE_DELETE: "TODO_API_FAILURE_DELETE",
};

export const NEW_TODO = "NEW_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const PATCH_TODO = "PATCH_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const SET_TODO_UPDATE = "SET_TODO_UPDATE";
export const RESET_TODO = "RESET_TODO";
export const RESET_TODOS = "RESET_TODOS";

export const getTodos = () => ({
  type: TODO.API_REQUEST_ALL,
});

export const setTodos = (todos: TodoProps[]) => ({
  type: TODO.API_SUCCESS_ALL,
  payload: { todos },
});

export const getTodo = (id: number) => ({
  type: TODO.API_REQUEST_ONE,
  payload: { id },
});

export const setTodo = (todo: TodoProps) => ({
  type: TODO.API_SUCCESS_ONE,
  payload: { todo },
});

export const newTodo = (data: TodoProps): AppThunk => async (dispatch) => {
  await TodoAPI.create(data);
  const todos = await TodoAPI.getAll();
  return dispatch({
    type: NEW_TODO,
    payload: { todos },
  });
};

export const updateTodo = (id: number, data: TodoProps): AppThunk => async (
  dispatch,
) => {
  const success = await TodoAPI.update(id, data);
  const todos = await TodoAPI.getAll();
  const todo =
    store.getState().todos.todo.id === id ? data : store.getState().todos.todo;
  return dispatch({
    type: UPDATE_TODO,
    payload: { todo, todos },
  });
};

export const patchTodo = (id: number, data: TodoPatchProps): AppThunk => async (
  dispatch,
) => {
  const success = await TodoAPI.patch(id, data);
  const todos = await TodoAPI.getAll();
  const todo =
    store.getState().todos.todo.id === id
      ? await TodoAPI.getOne(id)
      : store.getState().todos.todo;
  return dispatch({
    type: PATCH_TODO,
    payload: { todos, todo },
  });
};

export const deleteTodo = (id: number): AppThunk => async (dispatch) => {
  const success = await TodoAPI.remove(id);
  const todos = await TodoAPI.getAll();
  const todo =
    store.getState().todos.todo.id === id ? null : store.getState().todos.todo;
  return dispatch({
    type: DELETE_TODO,
    payload: { todo, todos },
  });
};

export const setTodoUpdate = (todo: TodoProps) => ({
  type: SET_TODO_UPDATE,
  payload: { todo },
});

export const resetTodos = () => ({
  type: RESET_TODOS,
});

export const resetTodo = () => ({
  type: RESET_TODO,
});

export default {
  getTodos,
  setTodos,
  getTodo,
  setTodo,
  newTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
  setTodoUpdate,
  resetTodos,
  resetTodo,
};
