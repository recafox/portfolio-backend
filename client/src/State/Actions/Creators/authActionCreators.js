import axios from "axios";
import actionTypes from "../Types";
import urls from "../../../Constants/urls";

import { LOCALSTORAGE_KEY } from "../../Reducers/authReducer";

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(urls.loginURL, { username, password });
      if (response.data.succeed) {
        dispatch({ type: actionTypes.LOGIN_USER });
        dispatch({
          type: actionTypes.SET_ALERT,
          payload: { isError: false, content: "login success" },
        });
        localStorage.setItem(LOCALSTORAGE_KEY, true);
      }
      if (!response.data.succeed) {
        dispatch({
          type: actionTypes.SET_ALERT,
          payload: { isError: false, content: "authentication failed" },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ALERT,
        payload: { isError: false, content: "error connecting to server" },
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(urls.logoutURL);
      if (response.data.succeed) {
        localStorage.removeItem(LOCALSTORAGE_KEY);
        dispatch({
          type: actionTypes.LOGOUT_USER,
          payload: {
            message: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ALERT,
        payload: { isError: false, content: "error connecting to server" },
      });
    }
  };
};
