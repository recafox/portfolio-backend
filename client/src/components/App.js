import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

const Login = () => <div>Login</div>;
const Backend = () => <div>Backend</div>;

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/backend" component={Backend}></Route>
    </BrowserRouter>
  );
};

export default App;
