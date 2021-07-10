import { useState } from "react";
import useActions from "../../Hooks/useActions";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, Button } from "./StyledComponents";

const Login = () => {
  const { loginUser } = useActions();
  const auth = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (auth.isLogin === true) {
    return <Redirect to="/backend"></Redirect>;
  }

  const renderAlert = () => {
    if (auth.isLogin === false && auth.message) {
      return (
        <p role="alert" className="alert-msg">
          {auth.message}
        </p>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ username, password });
  };

  return (
    <div>
      <Form>
        <Input
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        {renderAlert()}
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Log in
        </Button>
      </Form>
    </div>
  );
};

export default Login;
