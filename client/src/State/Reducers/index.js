import { combineReducers } from "redux";

import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import demoReducer from "./demoReducer";
import expReducer from "./expReducer";

const reducers = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  demo: demoReducer,
  exp: expReducer,
});

export default reducers;
