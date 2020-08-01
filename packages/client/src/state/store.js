import { createStore, combineReducers } from "redux";
import locations from "./reducers/locations";
import user from "./reducers/user";
import cart from "./reducers/cart";

const rootReducer = combineReducers({
    locations: locations,
    user: user,
    cart: cart,
});

export const store = createStore(rootReducer);
