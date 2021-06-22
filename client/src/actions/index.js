import axios from "axios";
import history from "../history";

export const actionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_WITH_ERROR: "SIGN_WITH_ERROR",
  SIGN_OUT: "SIGN_OUT",
};

export const signIn = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/login", { username, password });
    const state = {
      isLogin: true,
      loginError: false,
    };
    dispatch({ type: actionTypes.SIGN_IN, payload: state });
    history.push("/backend");
  } catch (error) {
    const state = {
      isLogin: false,
      loginError: true,
    };
    dispatch({ type: actionTypes.SIGN_WITH_ERROR, payload: state });
  }
};
