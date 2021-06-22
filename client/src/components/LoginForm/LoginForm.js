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

  const showErrorMessage = () => {
    if (props.auth.loginError) {
      return <span>Error!</span>;
    } else {
      return "";
    }
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
      {showErrorMessage()}
      <button type="submit">Login</button>
    </form>
  );
};

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}
export default connect(mapStateToProps, { signIn })(LoginForm);
