import { combineReducers, } from "redux";
import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";
import customerReducer from "./reducers/customerReducer";
import layoutReducer from "./reducers/layoutReducer";
import searchReducer from "./reducers/searchReducer";
import salesCartReducer from "./reducers/salesCartReducer";
import bluetoothReducer from "./reducers/bluetoothReducer";
import queueCartReducer from "./reducers/queueCartReducer";
import settingReducer from "./reducers/settingReducer";

const reducer = combineReducers({
    layout: layoutReducer,
    search: searchReducer,
    auth: authReducer,
    category: categoryReducer,
    customer: customerReducer,
    salesCart: salesCartReducer,
    bluetooth: bluetoothReducer,
    queueCart: queueCartReducer,
    setting: settingReducer
})

export default reducer;

export type State = ReturnType<typeof reducer>