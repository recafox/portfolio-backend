import axios from "axios";
import actionTypes from "../Types";
import urls from "../../../Constants/urls";

export const getProfile = () => {
  return async (dispatch) => {
    const response = await axios.get(urls.profileURL);
    if (!response.data) {
      dispatch({ type: actionTypes.GET_PROFILE });
    } else {
      dispatch({ type: actionTypes.GET_PROFILE, payload: response.data });
    }
  };
};
