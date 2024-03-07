import {RootState} from "../store";

export const UserSelector = (store:RootState)=>{
    return store.user
}
