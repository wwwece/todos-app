import React, { useEffect, useState } from "react";
import { Todo } from "../types/todo.type";

const TodosList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:4000/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {todos.length === 0 ? (
        <div>Loading...</div>
      ) : (
        todos.map((todo: Todo) => (
          <article key={todo.id}>
            <h1>{todo.title}</h1>
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
