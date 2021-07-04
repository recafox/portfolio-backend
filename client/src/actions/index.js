import axios from "axios";
import { LOGIN_SUCCEED, LOGIN_FAILED } from "./types";

export const login = (username, password) => async (dispatch) => {
  let history = useHistory();
  const res = await axios.post("/auth/login", { username, password });
  const succeedStatus = res.data.succeed;
  if (succeedStatus) {
    dispatch({ type: LOGIN_SUCCEED, payload: succeedStatus });
  } else {
    dispatch({ type: LOGIN_FAILED, payload: succeedStatus });
  }
};
