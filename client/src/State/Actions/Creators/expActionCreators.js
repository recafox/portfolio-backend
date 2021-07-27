import axios from "axios";
import actionTypes from "../Types";
import urls from "../../../Constants/urls";

export const getExp = () => {
  return async (dispatch) => {
    const response = await axios.get(urls.expURL);
    // return empty array if nothing
    dispatch({ type: actionTypes.GET_EXP, payload: response.data });
  };
};

export const addExp = (exp) => {
  return async (dispatch) => {
    const response = await axios.post(urls.expURL, exp);
    dispatch({ type: actionTypes.ADD_EXP, payload: response.data });
  };
};
