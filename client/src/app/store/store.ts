import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {API} from "./api/api";
import AppSlice from './app/app.slice'

const reducer = combineReducers({
    [API.reducerPath]: API.reducer,
    app: AppSlice
})
export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(API.middleware)
})
export type RootState = ReturnType<typeof store.getState>
