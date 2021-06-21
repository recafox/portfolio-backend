import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

const Login = () => <div>Login</div>;
const Backend = () => <div>Backend</div>;

const App = () => {
  useEffect(() => {
    async function fetch() {
      const res = await axios.get("/profile");
      console.log(res);
    }
    fetch();
  }, []);
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/backend" component={Backend}></Route>
    </BrowserRouter>
  );
};

export default App;
