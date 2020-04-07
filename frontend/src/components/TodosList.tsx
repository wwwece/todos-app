/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { TodoProps } from "../types/todo.type";
import { TodoAPI } from "../services/todoAPI";
import Todo from "./Todo";

const TodosList: React.FC = () => {
  const todoAPI = new TodoAPI();
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const match = useRouteMatch();

  const getTodos = async () => {
    setTodos(await todoAPI.getAll());
  };

  useEffect(() => {
    getTodos();
    return () => {
      setTodos([]);
    };
  }, []);

  return (
    <div>
      <button onClick={() => getTodos()}>Refresh</button>
      {todos.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ul>
            {todos.map((todo: TodoProps) => (
              <li key={todo.id}>
                <Link to={`${match.url}/${todo.id}`}>{todo.title}</Link>
              </li>
            ))}
          </ul>

          <Switch>
            <Route path={`${match.url}/:id`}>
              <Todo updateList={getTodos} />
            </Route>
            <Route path={`${match.url}`}>
              <div>Select a todo to see its details.</div>
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
};

export default TodosList;
