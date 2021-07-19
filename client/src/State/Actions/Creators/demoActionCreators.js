import axios from "axios";
import actionTypes from "../Types";
import urls from "../../../Constants/urls";

export const getDemo = () => {
  return async (dispatch) => {
    const response = await axios.get(urls.demoURL);
    // return empty array if nothing
    dispatch({ type: actionTypes.GET_DEMO, payload: response.data });
  };
};
