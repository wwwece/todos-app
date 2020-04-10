/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { bindActionCreators, Dispatch } from "redux";
import { Typography, Chip, IconButton } from "@material-ui/core";

import { getTodo, resetTodo, setTodoUpdate } from "./actions";
import { RootState } from "../types/redux";
import { TodoProps } from "../types/todos";
import TodoFormGrid from "./TodoFormGrid";
import Dialog from "../components/Dialog";

type Props = {
  todo: TodoProps | null;
  todoToUpdate: TodoProps | null;
  setTodoUpdate: typeof setTodoUpdate;
  getTodo: typeof getTodo;
  resetTodo: typeof resetTodo;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, data: TodoProps) => Promise<void>;
  onIsDone: (id: number, data: boolean) => Promise<void>;
};

const Todo: React.FC<Props> = ({
  todo,
  todoToUpdate,
  setTodoUpdate,
  getTodo,
  resetTodo,
  onDelete,
  onUpdate,
  onIsDone,
}) => {
  const { id } = useParams();
  const [updateOpen, setUpdateOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    getTodo(parseInt(id as string));
    return () => {
      resetTodo();
    };
  }, [id]);

  if (!id || !todo) return <div>Not found!</div>;

  return (
    <div>
      <div>
        <Typography variant="h3" gutterBottom>
          {todo.title}
        </Typography>
        <div>
          <Chip
            size="small"
            label={moment(todo.date).format("dddd, MMMM Do YYYY")}
          />
          <Chip size="small" label={todo.priority} />
          <IconButton
            aria-label="done"
            size="small"
            onClick={() => onIsDone(todo.id, !todo.isDone)}
          >
            <DoneIcon color={todo.isDone ? "primary" : "inherit"} />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => onDelete(todo.id)}
          >
            <DeleteIcon color={"error"} />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => setUpdateOpen(true)}
          >
            <EditIcon />
          </IconButton>
        </div>
        <Typography variant="body1">{todo.desc}</Typography>
      </div>

      {todoToUpdate && (
        <Dialog
          title="Update Todo"
          open={updateOpen}
          onClose={() => setUpdateOpen(false)}
          onAction={() => {
            onUpdate(todo.id, todoToUpdate);
            setUpdateOpen(false);
          }}
        >
          <TodoFormGrid todoData={todoToUpdate} setTodoData={setTodoUpdate} />
        </Dialog>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  todo: state.todos.todo,
  todoToUpdate: state.todos.todoUpdate,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getTodo, resetTodo, setTodoUpdate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
