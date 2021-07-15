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

export const editProfile = (profile) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(urls.profileURL, profile);
      dispatch({ type: actionTypes.EDIT_PROFILE, payload: "success" });
    } catch (error) {
      dispatch({
        type: actionTypes.EDIT_PROFILE,
        payload: "error connecting to server!",
      });
    }
  };
};
