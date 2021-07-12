import actionTypes from "../Actions/Types";

export const LOCALSTORAGE_KEY = "rita_is_here";

function getUserFromStorage() {
  const storedUser = localStorage.getItem(LOCALSTORAGE_KEY);
  return storedUser ? true : false;
}

const authReducer = (state = { isLogin: getUserFromStorage() }, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        isLogin: true,
        message: null,
      };
    case actionTypes.LOGIN_USER_ERROR:
      return {
        isLogin: false,
        message: action.payload.message,
      };
    case actionTypes.LOGOUT_USER:
      return {
        isLogin: false,
        message: action.payload.message,
      };
    case actionTypes.LOGOUT_USER_ERROR:
      return {
        isLogin: true,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default authReducer;
