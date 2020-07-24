import { createStore, combineReducers } from "redux";
import locations from "./reducers/locations";

const rootReducer = combineReducers({ locations: locations });

export const store = createStore(rootReducer);
