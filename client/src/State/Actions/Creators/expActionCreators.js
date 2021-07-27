import axios from "axios";
import actionTypes from "../Types";
import urls from "../../../Constants/urls";
import { getEmptyValue } from "../../../Helpers";

export const getExp = () => {
  return async (dispatch) => {
    const response = await axios.get(urls.expURL);
    // return empty array if nothing
    dispatch({ type: actionTypes.GET_EXP, payload: response.data });
  };
};

export const addExp = (exp) => {
  return async (dispatch) => {
    if (getEmptyValue(exp) > 0) {
      dispatch({
        type: actionTypes.SET_ALERT,
        payload: {
          isError: true,
          content: "Fill in EVERY field before you submit!",
        },
      });
    } else {
      try {
        const response = await axios.post(urls.expURL, exp);
        dispatch({ type: actionTypes.ADD_EXP, payload: response.data });
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ALERT,
          payload: {
            isError: true,
            content: "error connecting to server!",
          },
        });
      }
    }
  };
};
