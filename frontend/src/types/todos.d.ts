export type TodoProps = {
  id: number;
  title: string;
  desc: string;
  priority?: 1 | 2 | 3;
  date: Date;
  isDone?: boolean;
};

export type TodoPatchProps = {
  id?: number;
  title?: string;
  desc?: string;
  priority?: 1 | 2 | 3;
  date?: Date;
  isDone?: boolean;
};
