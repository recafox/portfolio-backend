import { ADD_SOCIAL_LINK } from "../actions/types";

const initialState = {
  description: "rita is here?????",
  nickname: "Rita!",
  skills: [],
  socialLinks: [],
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SOCIAL_LINK:
      // add a new link from payload
      let newSocialLinks = [...state.socialLinks, action.payload];
      // deep copy
      let newState = JSON.parse(JSON.stringify(state));
      newState.socialLinks = newSocialLinks;
      return newState;

    default:
      return state;
  }
}

export default profileReducer;
