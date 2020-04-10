import { TodoProps } from "./todos";
import { ThunkAction } from "redux-thunk";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface TodosState {
  todos: TodoProps[];
  todo: TodoProps | null;
  todoUpdate: TodoProps | null;
}

export type RootState = {
  todos: TodosState;
};

export type ActionProps = {
  type: string;
  payload?: any;
};
