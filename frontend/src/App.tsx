import React from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import TodosList from "./components/TodosList";
import TodoForm from "./components/TodoForm";
import Header from "./components/Header";
import { Container } from "@material-ui/core";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <div className="App">
        <Header />

        <Container>
          <Switch>
            <Route path="/todos">
              <TodosList />
            </Route>
            <Route path="/create">
              <TodoForm />
            </Route>
            <Route path="/">
              <div>Home</div>
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
