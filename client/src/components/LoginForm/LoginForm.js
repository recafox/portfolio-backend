import React from "react";

const LoginForm = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <form data-test="component-login-form">
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
    </form>
  );
};

export default LoginForm;
