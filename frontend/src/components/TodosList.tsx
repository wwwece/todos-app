/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { TodoProps } from "../types/todo.type";
import { TodoAPI } from "../services/todoAPI";
import Todo from "./Todo";

const TodosList: React.FC = () => {
  const todoAPI = new TodoAPI();
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const getTodos = async () => {
    setTodos(await todoAPI.getAll());
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <button onClick={() => getTodos()}>Refresh</button>
      {todos.length === 0 ? (
        <div>Loading...</div>
      ) : (
        todos.map((todo: TodoProps) => (
          <Todo todo={todo} updateList={getTodos} key={todo.id} />
        ))
      )}
    </div>
  );
};

export default TodosList;
