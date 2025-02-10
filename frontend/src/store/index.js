import { configureStore } from "@reduxjs/toolkit";
import * as persist from 'redux-persist';
import storage from "redux-persist/lib/storage"
import rootReducer from "./rootReducer";

const persistStore = persist.persistStore;
const persistReducer = persist.persistReducer;
const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)