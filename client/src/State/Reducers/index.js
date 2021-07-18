import { combineReducers } from "redux";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import demoReducer from "./demoReducer";

const reducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  demo: demoReducer,
});

export default reducers;
