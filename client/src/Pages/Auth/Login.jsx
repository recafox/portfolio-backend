import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useActions from "../../Hooks/useActions";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  const { loginUser } = useActions();
  const auth = useSelector((state) => state.auth);

  if (auth.isLogin === true) {
    return <Redirect to="/backend"></Redirect>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ username: "rita", password: "AZ75757575" });
  };

  return (
    <div>
      <form>
        <input placeholder="usrename" type="text"></input>
        <input placeholder="password" type="password"></input>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          log in
        </button>
      </form>
    </div>
  );
};

export default Login;
