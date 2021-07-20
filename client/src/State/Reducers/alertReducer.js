import actionTypes from "../Actions/Types";

export default function setAlertState(state = null, action) {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return action.payload || null;
    default:
      return state;
  }
}
