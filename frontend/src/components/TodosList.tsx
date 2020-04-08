/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { TodoProps } from "../types/todo.type";
import { TodoAPI } from "../services/todoAPI";
import Todo from "./Todo";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import moment from "moment";

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

  const handleDelete = async (id: number) => {
    const isDeleted = await todoAPI.delete(id);
    if (isDeleted) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const handleIsDone = async (id: number, isDone: boolean) => {
    const success = await todoAPI.patch(id, { isDone: isDone });
    if (success) getTodos();
  };

  return (
    <div>
      {todos.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <List dense={true}>
                {todos.map((todo: TodoProps) => (
                  <ListItem key={todo.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <DoneIcon color={todo.isDone ? "primary" : "inherit"} />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Link to={`${match.url}/${todo.id}`}>{todo.title}</Link>
                      }
                      secondary={moment(todo.date).format("DD.MM.YYYY")}
                    />

                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(todo.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={8}>
              <Switch>
                <Route path={`${match.url}/:id`}>
                  <Todo onDelete={handleDelete} onIsDone={handleIsDone} />
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

export default TodosList;
