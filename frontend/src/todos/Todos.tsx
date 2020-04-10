/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTodos } from "./actions";
import { RootState } from "../types/redux";
import { TodoProps } from "../types/todos";
import TodoAPI from "../services/todoAPI";
import Todo from "./Todo";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import TodosList from "./TodosList";
import TodoCreate from "./TodoCreate";

type Props = {
  todos: any;
  getTodos: typeof getTodos;
};

const Todos: React.FC<Props> = ({ todos, getTodos }) => {
  const match = useRouteMatch();

  useEffect(() => {
    getTodos();
    // TODO:
    // return () => {
    //   resetTodos();
    // };
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
      getTodos();
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

const mapStateToProps = (state: RootState) => ({
  todos: state.todos.todos,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ getTodos }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
