/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Typography, Chip, IconButton } from "@material-ui/core";
import { TodoProps } from "../types/todo.type";
import { TodoAPI } from "../services/todoAPI";
import TodoFormGrid from "./TodoFormGrid";
import Dialog from "./Dialog";

type Props = {
  onDelete: (id: number) => Promise<void>;
  onIsDone: (id: number, data: any) => Promise<void>;
};

const Todo: React.FC<Props> = ({ onDelete, onIsDone }) => {
  const { id } = useParams();
  const [todo, setTodo] = React.useState<TodoProps | null>(null);
  const [updatedTodo, setUpdatedTodo] = React.useState<TodoProps | null>(todo);
  const [updateOpen, setUpdateOpen] = React.useState<boolean>(false);
  const todoAPI = new TodoAPI();

  const getTodo = async (id: number | string | undefined) => {
    const parsedId = parseInt(id as string);
    if (parsedId) {
      const fetchedTodo = await todoAPI.getOne(parsedId);
      setTodo(fetchedTodo);
      setUpdatedTodo(fetchedTodo);
    }
  };

  React.useEffect(() => {
    getTodo(id);
    return () => {
      setTodo(null);
    };
  }, [id]);

  const handleUpdateTodo = async () => {
    if (todo && updatedTodo) {
      const success = await todoAPI.update(todo.id, updatedTodo);
      if (success) {
        setUpdateOpen(false);
        getTodo(id);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedTodo) {
      setUpdatedTodo({
        ...updatedTodo,
        [e.currentTarget.name]:
          e.currentTarget.type === "checkbox"
            ? e.currentTarget.checked
            : e.currentTarget.value,
      });
    }
  };

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
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => {
              setUpdateOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </div>
        <Typography variant="body1">{todo.desc}</Typography>
      </div>

      <Dialog
        title="Update Todo"
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
        onAction={handleUpdateTodo}
      >
        {updatedTodo && (
          <TodoFormGrid
            todoData={updatedTodo}
            onInputChange={handleInputChange}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Todo;
