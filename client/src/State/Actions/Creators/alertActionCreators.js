import actionTypes from "../Types";

export const setAlert = (isError, content) => {
  return {
    type: actionTypes.SET_ALERT,
    payload: { isError, content },
  };
};

export const clearAlert = () => {
  return {
    type: actionTypes.SET_ALERT,
  };
};
