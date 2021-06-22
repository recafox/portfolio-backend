import React from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions";

const LoginForm = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    props.signIn(username, password);
  };

  return (
    <form data-test="component-login-form" onSubmit={(e) => onSubmit(e)}>
      <label>
        username
        <input
          data-test="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </label>
      <label>
        password
        <input
          data-test="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default connect(null, { signIn })(LoginForm);
