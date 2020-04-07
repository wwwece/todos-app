/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TodoAPI } from "../services/todoAPI";
import { TodoProps } from "../types/todo.type";

type Props = {
  updateList: () => Promise<void>;
};

const Todo: React.FC<Props> = ({ updateList }) => {
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

  const handleDelete = async (id: number) => {
    const isDeleted = await todoAPI.delete(id);
    if (isDeleted) {
      setTodo(null);
      updateList();
    }
  };

  if (!id || !todo) return <div>Not found!</div>;

  return (
    <article>
      <h1>{todo.title}</h1>
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
      <div>
        <span>{todo.date}</span>
        <span>{todo.priority}</span>
        <span>{todo.isDone ? "Done" : "Waiting"}</span>
      </div>
      <p>{todo.desc}</p>
    </article>
  );
};

export default Todo;
