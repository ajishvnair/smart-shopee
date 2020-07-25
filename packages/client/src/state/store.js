import { createStore, combineReducers } from "redux";
import locations from "./reducers/locations";
import user from "./reducers/user";

const rootReducer = combineReducers({ locations: locations, user: user });

export const store = createStore(rootReducer);
