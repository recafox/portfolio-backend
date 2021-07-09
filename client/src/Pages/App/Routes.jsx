import { Route, Switch, Redirect } from "react-router-dom";

import Backend from "../Backend/Backend";
import Login from "../Auth/Login";
import Container from "../Common/Container";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props}></Component> : <Redirect to="/"></Redirect>
      }
    ></Route>
  );
};

const Routes = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <GuardedRoute exact path="/backend" component={Backend}></GuardedRoute>
      </Switch>
    </Container>
  );
};

export default Routes;
