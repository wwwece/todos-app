/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Todo } from "../types/todo.type";
import { TodoService } from "../services/todoService";

const TodosList: React.FC = () => {
  const todoService = new TodoService();
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    setTodos(await todoService.findAll());
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleDelete = async (id: number) => {
    const isDeleted = await todoService.remove(id);
    if (isDeleted) getTodos();
  };

  return (
    <div>
      <button onClick={() => getTodos()}>Refresh</button>
      {todos.length === 0 ? (
        <div>Loading...</div>
      ) : (
        todos.map((todo: Todo) => (
          <article key={todo.id}>
            <h1>{todo.title}</h1>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <div>
              <span>{todo.date}</span>
              <span>{todo.priority}</span>
              <span>{todo.isDone ? "Done" : "Waiting"}</span>
            </div>
            <p>{todo.desc}</p>
          </article>
        ))
      )}
    </div>
  );
};

export default TodosList;
