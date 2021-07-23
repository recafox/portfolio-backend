import axios from "axios";
import actionTypes from "../Types";
import urls from "../../../Constants/urls";
import { getEmptyValue } from "../../../Helpers";

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
      if (getEmptyValue(demo) > 0) {
        dispatch({
          type: actionTypes.SET_ALERT,
          payload: {
            isError: true,
            content: "Fill in EVERY field before you submit!",
          },
        });
      } else {
        const response = await axios.post(urls.demoURL, demo);
        dispatch({
          type: actionTypes.ADD_DEMO,
          // server return edited demo
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ALERT,
        payload: {
          isError: true,
          content: "error connecting to server!",
        },
      });
    }
  };
};

export const editDemo = (demo) => {
  return async (dispatch) => {
    try {
      if (getEmptyValue(demo) > 0) {
        dispatch({
          type: actionTypes.SET_ALERT,
          payload: {
            isError: true,
            content: "Fill in EVERY field before you submit!",
          },
        });
      } else {
        const demoID = demo.id;
        const response = await axios.put(`${urls.demoURL}/${demoID}`, demo);
        dispatch({
          type: actionTypes.EDIT_DEMO,
          payload: response.data,
        });
      }
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
}
