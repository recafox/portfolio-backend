import { actionTypes } from "../actions";

const INITIAL_STATE = {
  isLogin: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, ...action.payload };
    case actionTypes.SIGN_WITH_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default authReducer;
