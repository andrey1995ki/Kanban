import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {API} from "./api/api";
import AppSlice from './app/app.slice'
import TaskSlice from './task/task.slice'
import UserSlice from './user/user.slice'

const reducer = combineReducers({
    [API.reducerPath]: API.reducer,
    app: AppSlice,
    task: TaskSlice,
    user: UserSlice
})
export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(API.middleware)
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
