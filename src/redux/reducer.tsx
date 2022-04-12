import { combineReducers, } from "redux";
import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";
import layoutReducer from "./reducers/layoutReducer";
import searchReducer from "./reducers/searchReducer";

const reducer = combineReducers({
    layout: layoutReducer,
    search: searchReducer,
    auth: authReducer,
    category: categoryReducer
})

export default reducer;

export type State = ReturnType<typeof reducer>