import { combineReducers } from "redux";
import cardReducer from "./cardReducer";

let reducers = combineReducers({
    cardReducer: cardReducer,
});

const rootReducer = (state, action) => {
    return reducers(state, action);
};

export default rootReducer;
