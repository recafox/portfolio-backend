import actionTypes from "../../State/Actions/Types";

const profileReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE:
      if (action.payload) {
        return action.payload[0];
      }
      return {};

    default:
      return state;
  }
};

export default profileReducer;
