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
    let emptyTime = 0;
    for (let key in profile) {
      if (!profile[key] || !profile[key].length) {
        emptyTime += 1;
      }
    }
    if (emptyTime === Object.keys(profile).length) {
      dispatch({
        type: actionTypes.SET_ALERT,
        payload: {
          isError: true,
          content: "Do not submit empty profile!",
        },
      });
    } else {
      try {
        const response = await axios.post(urls.profileURL, profile);
        dispatch({ type: actionTypes.EDIT_PROFILE });
        dispatch({
          type: actionTypes.SET_ALERT,
          payload: {
            isError: false,
            content: "success",
          },
        });
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
