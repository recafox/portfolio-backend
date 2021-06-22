import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "../src/reducers";

export const middlewares = [reduxThunk];

const store = createStore(reducers, applyMiddleware(...middlewares));
export default store;
