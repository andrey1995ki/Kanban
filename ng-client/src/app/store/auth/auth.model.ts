import {ApiGetUserResponse, ApiLoginResponse} from "../../services/auth/auth.model";

export type AuthData = ApiLoginResponse
export type UserData = ApiGetUserResponse

export interface AuthState extends Partial<AuthData> {
  isLoading: boolean
}
