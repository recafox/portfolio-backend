import React from "react";
import GuardedRoute from "./pages/utils/GuardedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// styling
import { createGlobalStyle, ThemeProvider } from "styled-components";
import styled from "styled-components";

import LoginForm from "../src/pages/login/LoginForm";
import BackendEntry from "../src/pages/backend/BackendEntry";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.tertiaryColor};
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

const theme = {
  id: "main",
  primaryColor: "#3423A6",
  secondaryCOlor: "#171738",
  tertiaryColor: "#DFF3E4",
  supportColor: "#7180B9",
  fontSizeStandard: "16px",
  fontSizeMidLarge: "20px",
};

const Container = styled.div`
  width: 1040px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
`;

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <Container>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle></GlobalStyle>
          <Switch>
            <Route exact path="/" component={LoginForm}></Route>
            <GuardedRoute
              path="/backend"
              component={BackendEntry}
              auth={auth}
            ></GuardedRoute>
          </Switch>
        </ThemeProvider>
      </Router>
    </Container>
  );
}

export default App;
