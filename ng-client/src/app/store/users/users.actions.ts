import {Action} from "@ngrx/store";
import {Users} from "./users.model";
import {ApiUserActionsPayload} from "../../services/users/users.model";

export enum UsersActions {
  GetAllUsers = '[Users] GetAllUsers',
  SetAllUsers = '[Users] SetAllUsers',
  GetBoardUsers = '[Users] GetBoardUsers',
  SetBoardUsers = '[Users] SetBoardUsers',
  AddBoardUser = '[Users] AddBoardUser',
  SetAddBoardUser = '[Users] SetAddBoardUser',
  RemoveBoardUser = '[Users] RemoveBoardUser',
  SetRemoveBoardUser = '[Users] SetRemoveBoardUser',
}

export class GetAllUsers implements Action {
  readonly type = UsersActions.GetAllUsers
}

export class GetBoardUsers implements Action {
  readonly type = UsersActions.GetBoardUsers

  constructor(public payload: string) {
  }
}

export class SetAllUsers implements Action {
  readonly type = UsersActions.SetAllUsers

  constructor(public payload: Users[]) {
  }
}

export class SetBoardUsers implements Action {
  readonly type = UsersActions.SetBoardUsers

  constructor(public payload: Users[]) {
  }
}

export class AddBoardUser implements Action {
  readonly type = UsersActions.AddBoardUser

  constructor(public payload: ApiUserActionsPayload) {
  }
}

export class SetAddBoardUser implements Action {
  readonly type = UsersActions.SetAddBoardUser

  constructor(public payload: string) {
  }
}

export class RemoveBoardUser implements Action {
  readonly type = UsersActions.RemoveBoardUser

  constructor(public payload: ApiUserActionsPayload) {
  }
}

export class SetRemoveBoardUser implements Action {
  readonly type = UsersActions.SetRemoveBoardUser

  constructor(public payload: string) {
  }
}

export type UsersActionsType = GetAllUsers |
  GetBoardUsers |
  AddBoardUser |
  SetAddBoardUser |
  RemoveBoardUser |
  SetRemoveBoardUser | SetAllUsers |
  SetBoardUsers
