import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  desc: string;
  priority: 1 | 2 | 3;
  date: Date;
  isDone: boolean;
}

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
      {todos &&
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
        ))}
    </div>
  );
};

export default TodosList;
