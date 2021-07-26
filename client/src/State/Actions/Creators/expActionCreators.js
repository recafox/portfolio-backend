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
