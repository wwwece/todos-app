export type Todo = {
  id?: number;
  title: string;
  desc: string;
  priority?: 1 | 2 | 3;
  date: Date;
  isDone?: boolean;
};
