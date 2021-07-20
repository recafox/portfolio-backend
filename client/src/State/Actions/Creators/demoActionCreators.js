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

export const addDemo = (demo) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(urls.demoURL);
      dispatch({
        type: actionTypes.ADD_DEMO,
        payload: {
          item: demo,
          message: "success",
        },
      });
    } catch (error) {
      dispatch({
        type: actioTypes.ADD_DEMO,
        payload: {
          item: null,
          message: "error connecting to server!",
        },
      });
    }
  };
};
