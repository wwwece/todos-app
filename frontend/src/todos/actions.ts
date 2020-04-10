import { TodoProps, TodoPatchProps } from "../types/todos";
import TodoAPI from "../services/todoAPI";
import { AppThunk } from "../types/redux";
import { store } from "../App";

export const GET_TODOS = "GET_TODOS";
export const GET_TODO = "GET_TODO";
export const NEW_TODO = "NEW_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const PATCH_TODO = "PATCH_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const SET_TODO_UPDATE = "SET_TODO_UPDATE";
export const RESET_TODO = "RESET_TODO";
export const RESET_TODOS = "RESET_TODOS";

export const getTodos = (): AppThunk => async (dispatch) => {
  const data = await TodoAPI.getAll();
  return dispatch({
    type: GET_TODOS,
    payload: { todos: data },
  });
};

export const getTodo = (id: number): AppThunk => async (dispatch) => {
  const todo = await TodoAPI.getOne(id);
  return dispatch({
    type: GET_TODO,
    payload: { todo },
  });
};

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
  getTodo,
  newTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
  setTodoUpdate,
  resetTodos,
  resetTodo,
};
