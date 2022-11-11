import { createStore, applyMiddleware } from "redux";
import reducer, { State } from "./reducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from "react-native";

const persistConfig: any = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['bluetooth', 'layout']
}

const persistedReducer = persistReducer<State>(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store)

export { store, persistor }