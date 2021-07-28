import actionTypes from "../Actions/Types";

const expReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.GET_EXP:
      return action.payload;
    case actionTypes.ADD_EXP:
      return [...state, action.payload];
    case actionTypes.DELETE_EXP:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};

export default expReducer;
