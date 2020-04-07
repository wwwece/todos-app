import React from "react";
import "./App.css";
import TodosList from "./components/TodosList";
import TodoForm from "./components/TodoForm";
import { Router, Link, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/todos">Todos</Link>
              </li>
              <li>
                <Link to="/create">New Todo</Link>
              </li>
            </ul>
          </nav>
        </header>

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
      </div>
    </Router>
  );
}

export default App;
