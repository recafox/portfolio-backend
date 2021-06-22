import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import LoginForm from "./LoginForm/LoginForm";

import axios from "axios";
const Backend = () => {
  const logout = async () => {
    await axios.get("/auth/logout");
    history.push("/");
  };
  return (
    <div>
      backend
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const App = () => {
  return (
    <div data-test="component-app">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LoginForm}></Route>
          <Route exact path="/backend" component={Backend}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
