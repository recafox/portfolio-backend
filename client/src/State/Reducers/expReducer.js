import actionTypes from "../Actions/Types";

const expReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.GET_EXP:
      return action.payload;
    case actionTypes.ADD_EXP:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default expReducer;
