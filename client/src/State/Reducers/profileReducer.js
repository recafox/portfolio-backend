import actionTypes from "../../State/Actions/Types";

const profileReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE:
      if (action.payload) {
        return action.payload[0];
      }
      return {};
    case actionTypes.EDIT_PROFILE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
