/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { TodoProps } from "./types";
import TodoAPI from "../services/todoAPI";
import Todo from "./Todo";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import TodosList from "./TodosList";
import TodoCreate from "./TodoCreate";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const match = useRouteMatch();

  const getTodos = async () => {
    setTodos(await TodoAPI.getAll());
  };

  useEffect(() => {
    getTodos();
    return () => {
      setTodos([]);
    };
  }, []);

  const handleCreateNew = async (data: TodoProps) => {
    const result = await TodoAPI.create(data);
    if (result) {
      getTodos();
      return true;
    }
    return false;
  };

  const handleDelete = async (id: number) => {
    const isDeleted = await TodoAPI.remove(id);
    if (isDeleted) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
    return isDeleted;
  };

  const handleUpdate = async (id: number, data: TodoProps) => {
    const success = await TodoAPI.update(id, data);
    if (success) getTodos();
    return success;
  };

  const handleIsDone = async (id: number, isDone: boolean) => {
    const success = await TodoAPI.patch(id, { isDone: isDone });
    if (success) getTodos();
    return success;
  };

  return (
    <div>
      {todos.length === 0 ? (
        <CircularProgress />
      ) : (
        <div>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h2">Todos</Typography>
            </Grid>

            <Grid item xs={4}>
              <TodoCreate onCreateNew={handleCreateNew} />
              <TodosList
                todos={todos}
                routeMatch={match}
                onDelete={handleDelete}
                onIsDone={handleIsDone}
              />
            </Grid>

            <Grid item xs={8}>
              <Switch>
                <Route path={`${match.url}/:id`}>
                  <Todo
                    todos={todos}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onIsDone={handleIsDone}
                  />
                </Route>
                {/* <Route path={`${match.url}`}>
                  <div>Select a todo to see its details.</div>
                </Route> */}
              </Switch>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Todos;
