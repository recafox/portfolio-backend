import actionTypes from "../../State/Actions/Types";

const demoReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.GET_DEMO:
      return action.payload;
    default:
      return state;
  }
};

export default demoReducer;
