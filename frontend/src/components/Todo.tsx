/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { TodoAPI } from "../services/todoAPI";
import { TodoProps } from "../types/todo.type";
import { Paper, Typography, Chip, IconButton } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";

type Props = {
  handleDelete: (id: number) => Promise<void>;
};

const Todo: React.FC<Props> = ({ handleDelete }) => {
  const { id } = useParams();
  const todoAPI = new TodoAPI();
  const [todo, setTodo] = React.useState<TodoProps | null>(null);

  const getTodo = async () => {
    if (id) setTodo(await todoAPI.getOne(parseInt(id)));
  };

  useEffect(() => {
    getTodo();
    return () => {
      setTodo(null);
    };
  }, [id]);

  if (!id || !todo) return <div>Not found!</div>;

  return (
    <Paper elevation={3}>
      <Typography variant="h3" gutterBottom>
        {todo.title}
      </Typography>
      <div>
        <Chip
          size="small"
          label={moment(todo.date).format("dddd, MMMM Do YYYY")}
        />
        <Chip size="small" label={todo.priority} />
        <IconButton aria-label="done" size="small">
          <DoneIcon color={todo.isDone ? "primary" : "inherit"} />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            handleDelete(todo.id);
            setTodo(null);
          }}
        >
          <DeleteIcon color={"error"} />
        </IconButton>
      </div>
      <Typography variant="body1">{todo.desc}</Typography>
    </Paper>
  );
};

export default Todo;
