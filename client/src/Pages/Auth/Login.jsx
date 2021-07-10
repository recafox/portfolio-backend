import { useState } from "react";
import useActions from "../../Hooks/useActions";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = () => {
  const { loginUser } = useActions();
  const auth = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (auth.isLogin === true) {
    return <Redirect to="/backend"></Redirect>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ username, password });
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <input
          placeholder="usrename"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          log in
        </button>
      </form>
    </div>
  );
};

export default Login;
