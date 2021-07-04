import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { LOGIN_SUCCEED, LOGIN_FAILED } from "../../actions/types";
import styled from "styled-components";

// styled components
import Input from "../components/Input";
import Button from "../components/Button";

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  label {
    margin-bottom: 10px;
  }

  input {
    letter-spacing: 0.6rem;
    text-align: center;
  }

  button {
    letter-spacing: 0.3rem;
    margin-top: 20px;
  }
`;

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
    <Form onSubmit={(e) => handleSubmit(e)}>
      <label>
        <Input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          onClick={(e) => handleInputOnClick(e)}
        ></Input>
      </label>
      <label>
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          onClick={(e) => handleInputOnClick(e)}
        ></Input>
      </label>
      {renderErrorText()}
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
