import React from "react";
import ReactDOM from "react-dom";
import App from "./Pages/App/App";
import { BrowserRouter } from "react-router-dom";
// styling
import "./Styles/reset.css";
import "./Styles/index.css";

ReactDOM.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>,
  document.getElementById("root")
);
