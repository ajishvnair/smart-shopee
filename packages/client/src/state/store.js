import { createStore } from "redux";
import locations from "./reducers/locations";

export const store = createStore(locations);
