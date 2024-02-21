import {TemplateNameState} from "./templateName.model";
import {createSlice} from "@reduxjs/toolkit";

const initialState: TemplateNameState = {
}

const TemplateNameSlice = createSlice({
    name:'templateName',
    initialState,
    reducers:{
    }
})
export const {

} = TemplateNameSlice.actions
export default TemplateNameSlice.reducer
