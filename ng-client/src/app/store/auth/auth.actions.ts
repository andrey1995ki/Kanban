import {Action} from "@ngrx/store";
import {AuthData, RegistrationData, UserData} from "./auth.model";
import {User} from "../../services/auth/auth.model";

export enum AuthActions {
  Login = '[Auth] Login',
  SetAuth = '[Auth] SetAuth',
  GetUser = '[Auth] GetUser',
  SetUser = '[Auth] SetUser',
  SetToken = '[Auth] SetToken',
  ToggleLoading = '[Auth] ToggleLoading',
  SetError = '[Auth] SetError',
  Registration = '[Auth] Registration',
  SuccessRegist = '[Auth] SuccessRegist'
}

export class Login implements Action {
  readonly type = AuthActions.Login

  constructor(public payload: User) {
  }
}

export class SetAuth implements Action {
  readonly type = AuthActions.SetAuth

  constructor(public payload: AuthData) {
  }
}

export class GetUser implements Action {
  readonly type = AuthActions.GetUser
}

export class SetUser implements Action {
  readonly type = AuthActions.SetUser

  constructor(public payload: UserData) {
  }
}

export class SetToken implements Action {
  readonly type = AuthActions.SetToken

  constructor(public payload: { token: string | undefined }) {
  }
}

export class ToggleLoading implements Action {
  readonly type = AuthActions.ToggleLoading

  constructor(public payload: boolean) {
  }
}

export class SetError implements Action {
  readonly type = AuthActions.SetError
}

export class Registration implements Action {
  readonly type = AuthActions.Registration

  constructor(public payload: RegistrationData) {
  }
}
export class SuccessRegist implements Action{
  readonly type = AuthActions.SuccessRegist

}
export type AuthActionsType = Login | SetAuth | GetUser | SetUser | SetToken | ToggleLoading | SetError | Registration | SuccessRegist
