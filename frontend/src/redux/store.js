// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";  // Correctly import the reducer
import employeeReducer from "./employeeSlice";  // Correctly import the employeeReducer

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

// Combine reducers correctly
const rootReducer = combineReducers({
    auth: authReducer,  // Use the reducer exported from authSlice
    employees: employeeReducer,  // Use the reducer for employees
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
