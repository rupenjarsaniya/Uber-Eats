import { createStore } from "redux";
import rootReducer from "./reducers";

export default function confifureState(initialState) {
    // console.log("Store initialState " + initialState);
    return createStore(rootReducer, initialState);
}
