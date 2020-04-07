import React from "react";
import { TodoAPI } from "../services/todoAPI";
import { TodoProps } from "../types/todo.type";

type Props = {
  todo: TodoProps;
  updateList: () => Promise<void>;
};

const Todo: React.FC<Props> = ({ todo, updateList }) => {
  const todoAPI = new TodoAPI();

  const handleDelete = async (id: number) => {
    const isDeleted = await todoAPI.delete(id);
    if (isDeleted) updateList();
  };

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
