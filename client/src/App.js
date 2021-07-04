import React from "react";
import GuardedRoute from "./pages/utils/GuardedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { LOGOUT } from "./actions/types";

import LoginForm from "../src/pages/login/LoginForm";

const BackendPage = (props) => {
  const dispatch = useDispatch();
  const logout = async (e) => {
    const response = await axios.get("/auth/logout");
    if (response.data.succeed) {
      dispatch({ type: LOGOUT });
    }
  };
  return (
    <div>
      <button onClick={(e) => logout(e)}>logout</button>
      <h1>Backend</h1>
    </div>
  );
};

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm}></Route>
        <GuardedRoute
          path="/backend"
          component={BackendPage}
          auth={auth}
        ></GuardedRoute>
      </Switch>
    </Router>
  );
}

export default App;
