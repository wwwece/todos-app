/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Grid, CircularProgress, Typography } from "@material-ui/core";

import { RootState } from "../types/redux";
import { TodoProps } from "../types/todos";
import TodoCreate from "./TodoCreate";
import TodosList from "./TodosList";
import Actions from "./actions";
import Todo from "./Todo";

type Props = {
  todos: TodoProps[];
  getTodos: typeof Actions.getTodos;
  newTodo: typeof Actions.newTodo;
  updateTodo: typeof Actions.updateTodo;
  patchTodo: typeof Actions.patchTodo;
  deleteTodo: typeof Actions.deleteTodo;
  resetTodos: typeof Actions.resetTodos;
};

const Todos: React.FC<Props> = ({
  todos,
  getTodos,
  newTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
  resetTodos,
}) => {
  const match = useRouteMatch();

  React.useEffect(() => {
    getTodos();
    return () => {
      resetTodos();
    };
  }, []);

  const handleCreateNew = async (data: TodoProps) => {
    newTodo(data);
  };

  const handleDelete = async (id: number) => {
    deleteTodo(id);
  };

  const handleUpdate = async (id: number, data: TodoProps) => {
    updateTodo(id, data);
  };

  const handleIsDone = async (id: number, isDone: boolean) => {
    patchTodo(id, { isDone: isDone });
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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...Actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
