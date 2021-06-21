import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

import LoginForm from "./LoginForm/LoginForm";

const Backend = () => <div>Backend</div>;

const App = () => {
  return (
    <div data-test="component-app">
      <BrowserRouter>
        <Route exact path="/" component={LoginForm}></Route>
        <Route exact path="/backend" component={Backend}></Route>
      </BrowserRouter>
    </div>
  );
};

export default App;
