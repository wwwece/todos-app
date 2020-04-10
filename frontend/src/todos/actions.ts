import TodoAPI from "../services/todoAPI";
import { RootState } from "../types/redux";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export const GET_TODOS = "GET_TODOS";

export const getTodos = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const res = await TodoAPI.getAll();
  return dispatch({
    type: GET_TODOS,
    payload: res,
  });
};
