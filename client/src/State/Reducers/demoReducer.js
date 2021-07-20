import actionTypes from "../../State/Actions/Types";

const demoReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.GET_DEMO:
      return action.payload;
    case actionTypes.ADD_DEMO:
      let newState = state ? state : [];
      if (action.payload.item) {
        return [...newState, action.payload.item];
      } else {
      }
    default:
      return state;
  }
};

export default demoReducer;
