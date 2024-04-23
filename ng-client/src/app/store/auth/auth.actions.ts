import {Action} from "@ngrx/store";
import {AuthData, UserData} from "./auth.model";
import {User} from "../../services/auth/auth.model";

export enum AuthActions {
  Login = '[Auth] Login',
  SetAuth = '[Auth] SetAuth',
  GetUser = '[Auth] GetUser',
  SetUser = '[Auth] SetUser',
  SetToken = '[Auth] SetToken',
  ToggleLoading = '[Auth] ToggleLoading',
  SetError = '[Auth] SetError'
}

export class Login implements Action {
  readonly type = AuthActions.Login

  constructor(public payload: User) {
    console.log(payload)
  }
}

export class SetAuth implements Action {
  readonly type = AuthActions.SetAuth

  constructor(public payload: AuthData) {
    console.log(payload)
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

export type AuthActionsType = Login | SetAuth | GetUser | SetUser | SetToken | ToggleLoading | SetError
