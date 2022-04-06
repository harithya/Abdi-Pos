import { combineReducers, } from "redux";
import layoutReducer from "./reducers/layoutReducer";

const reducer = combineReducers({
    layout: layoutReducer
})

export default reducer;

export type State = ReturnType<typeof reducer>