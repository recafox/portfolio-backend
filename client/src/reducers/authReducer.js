import { LOGIN_SUCCEED, LOGIN_FAILED, LOGOUT } from "../actions/types";

function authReducer(state = null, action) {
  switch (action.type) {
    case LOGIN_SUCCEED:
      return action.payload; // true
    case LOGIN_FAILED:
      return action.payload; // false
    case LOGOUT:
      return false;
    default:
      return state;
  }
}

export default authReducer;
