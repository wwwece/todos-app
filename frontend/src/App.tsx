import React from "react";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { Router, Switch, Route } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { Container, ThemeProvider, CssBaseline } from "@material-ui/core";

import Header from "./components/Header";
import rootReducer from "./rootReducer";
import Todos from "./todos/Todos";
import theme from "./theme/theme";

const middleware = [logger, thunk];

export const store = createStore(
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
