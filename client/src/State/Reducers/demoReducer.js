import actionTypes from "../../State/Actions/Types";

const demoReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.GET_DEMO:
      return action.payload;
    case actionTypes.ADD_DEMO:
      return [...state, action.payload];
    case actionTypes.EDIT_DEMO:
      const editedDemo = action.payload;
      let newState = state.map((item) => {
        if (item._id === editedDemo._id) {
          return editedDemo
        } else {
          return item;
        }
      });
      return newState;
    case actionTypes.DELETE_DEMO:
      return state.filter(item => item._id !== action.payload._id);
    default:
      return state;
  }
};

export default demoReducer;
