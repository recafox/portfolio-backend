import React from "react";
import ReactDOM from "react-dom";
import App from "./Pages/App/App";
import { BrowserRouter } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { store } from "./State";
// styling
import "./Styles/reset.css";
import "./Styles/index.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
