import React from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import Todos from "./components/Todos";
import TodoForm from "./components/TodoForm";
import Header from "./components/Header";
import { Container, ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme/theme";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={browserHistory}>
        <div className="App">
          <Header />

          <Container>
            <Switch>
              <Route path="/todos">
                <Todos />
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
    </ThemeProvider>
  );
}

export default App;
