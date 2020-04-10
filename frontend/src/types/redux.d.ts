import { TodoProps } from "./todos";

export interface TodosState {
  todos: TodoProps[];
}

export type RootState = {
  todos: {
    todos: TodoProps[];
  };
};

export type ActionProps = {
  type: string;
  payload: object;
};
