import {setUserAction, UserState} from "./user.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTokenInCooke} from "./user.utils";

const initialState: UserState = {
    login: undefined,
    name: undefined,
    id: undefined,
    token: getTokenInCooke(),
    isAuth: false
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, actions: PayloadAction<setUserAction>) => {
            const {login, name, id, token} = actions.payload
            state.login = login
            state.name = name
            state.id = id
            if (token) {
                state.token = token
            }
            state.isAuth = true
        },
        logoutUser: (state) => {
            state.login = undefined
            state.name = undefined
            state.id = undefined
            state.token = undefined
            state.isAuth = false
            document.cookie = "token=;max-age=-1"
        }
    }
})
export const {
    setUser,
    logoutUser
} = UserSlice.actions
export default UserSlice.reducer
