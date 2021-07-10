import actionTypes from "../Actions/Types";

const authReducer = (state = {}, action) => {
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
