/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
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
  todos: TodoProps[];
  onDelete: (id: number) => Promise<boolean>;
  onUpdate: (id: number, data: TodoProps) => Promise<boolean>;
  onIsDone: (id: number, data: any) => Promise<boolean>;
};

const Todo: React.FC<Props> = ({ todos, onDelete, onUpdate, onIsDone }) => {
  const { id } = useParams();
  const [todo, setTodo] = useState<TodoProps | null>(null);
  const [todoToUpdate, setTodoToUpdate] = useState<TodoProps | null>(todo);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const todoAPI = new TodoAPI();

  const getTodo = async (id: number | string | undefined) => {
    const parsedId = parseInt(id as string);
    if (parsedId) {
      const fetchedTodo = await todoAPI.getOne(parsedId);
      setTodo(fetchedTodo);
      setTodoToUpdate(fetchedTodo);
    }
  };

  React.useEffect(() => {
    getTodo(id);
    return () => {
      setTodo(null);
    };
  }, [id, todos]);

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
            onClick={async () => {
              const success = await onIsDone(todo.id, !todo.isDone);
              if (success) getTodo(id);
            }}
          >
            <DoneIcon color={todo.isDone ? "primary" : "inherit"} />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={async () => {
              const success = await onDelete(todo.id);
              if (success) setTodo(null);
            }}
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
          onAction={async () => {
            const success = await onUpdate(todo.id, todoToUpdate);
            if (success) {
              setUpdateOpen(false);
              getTodo(id);
            }
          }}
        >
          <TodoFormGrid todoData={todoToUpdate} setTodoData={setTodoToUpdate} />
        </Dialog>
      )}
    </div>
  );
};

export default Todo;
