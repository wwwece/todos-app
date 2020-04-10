import React, { useState } from "react";
import { Button, withStyles, Theme } from "@material-ui/core";

import { TodoProps } from "../types/todos";
import TodoFormGrid from "./TodoFormGrid";
import Dialog from "../components/Dialog";

const CreateNewButton = withStyles((theme: Theme) => ({
  root: {
    margin: "10px",
    width: "100%",
  },
}))(Button);

type Props = {
  onCreateNew: (data: TodoProps) => Promise<void>;
};

const TodoCreate: React.FC<Props> = ({ onCreateNew }) => {
  const INITIAL_VALUES: TodoProps = {
    id: 0,
    title: "",
    desc: "",
    date: new Date(),
    isDone: false,
    priority: 3,
  };

  const [todo, setTodo] = React.useState<TodoProps>(INITIAL_VALUES);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <div>
      <CreateNewButton
        onClick={() => setDialogOpen(true)}
        color="secondary"
        variant="contained"
      >
        Create New Todo
      </CreateNewButton>

      {todo && (
        <Dialog
          title="Create new Todo"
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onAction={() => {
            onCreateNew(todo);
            setDialogOpen(false);
          }}
        >
          <TodoFormGrid todoData={todo} setTodoData={setTodo} />
        </Dialog>
      )}
    </div>
  );
};

export default TodoCreate;
