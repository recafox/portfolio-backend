import actionTypes from "../../State/Actions/Types";

const demoReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.GET_DEMO:
      return action.payload;
    case actionTypes.ADD_DEMO:
      console.log("ADD DEMO", [...state, action.payload.item]);
      return [...state, action.payload.item];
    default:
      return state;
  }
};

export default demoReducer;
