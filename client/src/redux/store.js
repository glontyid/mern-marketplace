import {applyMiddleware, combineReducers, createStore} from "redux";
import {marketReducer} from "./reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({marketReducer})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));