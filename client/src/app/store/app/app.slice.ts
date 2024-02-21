import {AppState} from "./app.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ApiBoardColumnResponse, ApiBoardsResponse} from "../api/api.model";

const initialState: AppState = {
    boards: [],
    columns: []
}

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setBoards: (state, actions: PayloadAction<Array<ApiBoardsResponse>>) => {
            state.boards = actions.payload
        },
        addNewBoard: (state, actions: PayloadAction<ApiBoardsResponse>) => {
            state.boards = [...state.boards, actions.payload]
        },
        setColumn: (state, actions: PayloadAction<Array<ApiBoardColumnResponse>>) => {
            state.columns = actions.payload
        },
    }
})
export const {setBoards, addNewBoard, setColumn} = AppSlice.actions
export default AppSlice.reducer
