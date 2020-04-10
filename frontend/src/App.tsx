import React from "react";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import Todos from "./todos/Todos";
import Header from "./components/Header";
import { Container, ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme/theme";
import rootReducer from "./rootReducer";

const middleware = [logger, thunk];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
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
                <Route path="/">
                  <div>Home</div>
                </Route>
              </Switch>
            </Container>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
