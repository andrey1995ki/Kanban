import {ApiLoginResponse} from "../api/api.model";

export interface UserState extends Partial<ApiLoginResponse>{
    isAuth: boolean
}

export type setUserAction = Omit<ApiLoginResponse, "token"> & {token?: string}
