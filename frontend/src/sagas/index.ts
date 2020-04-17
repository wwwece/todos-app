import { takeEvery, call, put } from "redux-saga/effects";
import { ActionProps } from "../types/redux";
import { store } from "../App";

import Actions, { TODO } from "../todos/actions";
import TodoAPI from "../services/todoAPI";

// worker sagas:
function* fetchTodos() {
  const todos = yield call(TodoAPI.getAll);
  yield put(Actions.setTodos(todos));
}

function* fetchTodo(action: ActionProps) {
  const todo = yield call(TodoAPI.getOne, action.payload.id);
  yield put(Actions.setTodo(todo));
}

function* createTodo(action: ActionProps) {
  const todo = yield call(TodoAPI.create, action.payload.todo);
  yield put(Actions.getTodos());
  yield put(Actions.setTodo(todo));
}

function* removeTodo(action: ActionProps) {
  const { id } = action.payload;
  yield call(TodoAPI.remove, id);
  yield put(Actions.getTodos());
  if (store.getState().todos.todo.id === id) yield put(Actions.resetTodo());
}

function* updateTodo(action: ActionProps) {
  const { id, todo } = action.payload;
  yield call(TodoAPI.update, id, todo);
  yield put(Actions.getTodos());
  if (store.getState().todos.todo.id === id) yield put(Actions.getTodo(id));
}

function* patchTodo(action: ActionProps) {
  const { id, todo } = action.payload;
  yield call(TodoAPI.patch, id, todo);
  yield put(Actions.getTodos());
  if (store.getState().todos.todo.id === id) yield put(Actions.getTodo(id));
}

// watcher saga:
function* rootSaga() {
  yield takeEvery(TODO.API_REQUEST_ONE, fetchTodo);
  yield takeEvery(TODO.API_REQUEST_ALL, fetchTodos);
  yield takeEvery(TODO.API_REQUEST_CREATE, createTodo);
  yield takeEvery(TODO.API_REQUEST_DELETE, removeTodo);
  yield takeEvery(TODO.API_REQUEST_UPDATE, updateTodo);
  yield takeEvery(TODO.API_REQUEST_PATCH, patchTodo);
}

export default rootSaga;

export { rootSaga };
