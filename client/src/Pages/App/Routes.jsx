import { Route, Switch } from "react-router-dom";

import Backend from "../Backend/Backend";
import Login from "../Auth/Login";
import Container from "../Common/Container";

const Routes = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/backend" component={Backend}></Route>
      </Switch>
    </Container>
  );
};

export default Routes;
