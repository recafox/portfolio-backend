import axios from "axios";
import history from "../history";

export const actionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

export const signIn = (username, password) => async (dispatch) => {
  const res = await axios.post("/auth/login", { username, password });
  dispatch({ type: actionTypes.SIGN_IN, payload: res.data });
  history.push("/backend");
};
