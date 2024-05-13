import {ApiGetUserResponse, ApiLoginResponse, ApiUserRegistration} from "../../services/auth/auth.model";

export type AuthData = ApiLoginResponse
export type UserData = ApiGetUserResponse
export type RegistrationData = ApiUserRegistration

export interface AuthState extends Partial<AuthData> {
  isLoading: boolean
}
