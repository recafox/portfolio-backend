import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { LOGIN_SUCCEED, LOGIN_FAILED } from "../../actions/types";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorText, setShowErrorText] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("/auth/login", { username, password });
    const successStatus = response.data.succeed;
    if (successStatus) {
      dispatch({ type: LOGIN_SUCCEED, payload: successStatus });
      history.push("/backend");
    } else {
      dispatch({ type: LOGIN_FAILED, payload: successStatus });
      setShowErrorText(true);
    }
  };

  const renderErrorText = () => {
    if (showErrorText) {
      return <p>authentication failed</p>;
    }
  };

  const handleInputOnClick = (e) => {
    if (showErrorText) {
      setShowErrorText(false);
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>
        username
        <input
          onChange={(e) => setUsername(e.target.value)}
          onClick={(e) => handleInputOnClick(e)}
        ></input>
      </label>
      <label>
        password
        <input
          onChange={(e) => setPassword(e.target.value)}
          onClick={(e) => handleInputOnClick(e)}
        ></input>
      </label>
      {renderErrorText()}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
