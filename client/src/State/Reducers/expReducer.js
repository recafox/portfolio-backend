import actionTypes from "../Actions/Types";

const expReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.GET_EXP:
      return action.payload;
    case actionTypes.ADD_EXP:
      return [...state, action.payload];
    case actionTypes.DELETE_EXP:
      return state.filter((item) => item._id !== action.payload._id);
    case actionTypes.EDIT_EXP:
      return state.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        } else {
          return item;
        }
      });
    default:
      return state;
  }
};

export default expReducer;
