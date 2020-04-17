import { takeEvery, call, put } from "redux-saga/effects";

import Actions, {
  TODO,
  // NEW_TODO,
  // UPDATE_TODO,
  // PATCH_TODO,
  // DELETE_TODO,
  // SET_TODO_UPDATE,
  // RESET_TODOS,
  // RESET_TODO,
} from "../todos/actions";
import TodoAPI from "../services/todoAPI";

// worker saga:
function* fetchTodos() {
  const todos = yield call(TodoAPI.getAll);
  yield put(Actions.setTodos(todos));
}

function* fetchTodo(action: any) {
  const todo = yield call(TodoAPI.getOne, action.payload.id);
  yield put(Actions.setTodo(todo));
}

// watcher saga:
function* rootSaga() {
  yield takeEvery(TODO.API_REQUEST_ONE, fetchTodo);
  yield takeEvery(TODO.API_REQUEST_ALL, fetchTodos);
}

export default rootSaga;

export { rootSaga };
