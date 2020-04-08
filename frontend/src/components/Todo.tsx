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
  onDelete: (id: number) => Promise<void>;
  onIsDone: (id: number, data: any) => Promise<void>;
};

const Todo: React.FC<Props> = ({ onDelete, onIsDone }) => {
  const { id } = useParams();
  const todoAPI = new TodoAPI();
  const [todo, setTodo] = React.useState<TodoProps | null>(null);

  const getTodo = async (id: number | string | undefined) => {
    const parsedId = parseInt(id as string);
    if (parsedId) setTodo(await todoAPI.getOne(parsedId));
  };

  useEffect(() => {
    getTodo(id);
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
        <IconButton
          aria-label="done"
          size="small"
          onClick={() => {
            onIsDone(todo.id, !todo.isDone);
            setTodo({ ...todo, isDone: !todo.isDone });
          }}
        >
          <DoneIcon color={todo.isDone ? "primary" : "inherit"} />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            onDelete(todo.id);
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
