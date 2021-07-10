import axios from "axios";
import actionTypes from "../Types";
import urls from "../../../Constants/urls";

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(urls.loginURL, { username, password });
      if (response.data.succeed) {
        dispatch({ type: actionTypes.LOGIN_USER });
      }
      if (!response.data.succeed) {
        dispatch({
          type: actionTypes.LOGIN_USER_ERROR,
          payload: { message: response.data.message },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_USER_ERROR,
        payload: {
          message: "There was a problem connecting to the server",
        },
      });
    }
  };
};
