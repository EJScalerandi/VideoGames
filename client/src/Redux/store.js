import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import homeReducer from "./reducers";

const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(homeReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;