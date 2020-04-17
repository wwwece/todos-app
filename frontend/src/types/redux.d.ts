import { TodoProps } from "./todos";

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
