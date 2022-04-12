import { combineReducers, } from "redux";
import authReducer from "./reducers/authReducer";
import layoutReducer from "./reducers/layoutReducer";
import searchReducer from "./reducers/searchReducer";

const reducer = combineReducers({
    layout: layoutReducer,
    search: searchReducer,
    auth: authReducer
})

export default reducer;

export type State = ReturnType<typeof reducer>