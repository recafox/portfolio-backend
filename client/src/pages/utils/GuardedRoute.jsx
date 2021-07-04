import { Route, Redirect } from "react-router-dom";
// rename component to Component, cus jsx see tag starting with lowercase as html tag
const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  // const Component = component;
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/"></Redirect>
        )
      }
    ></Route>
  );
};

export default GuardedRoute;
