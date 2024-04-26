import {Action} from "@ngrx/store";

export enum ColumnActions {
  GetColumn = '[Column] GetColumn',
  SetColumn = '[Column] SetColumn',
  ToggleLoading = '[Column] ToggleLoading'
}

export class GetColumn implements Action {
  readonly type = ColumnActions.GetColumn

  constructor(public payload: string) {
  }
}

export class SetColumn implements Action {
  readonly type = ColumnActions.SetColumn

  constructor(public payload: any) {
  }
}

export class ToggleLoading implements Action {
  readonly type = ColumnActions.ToggleLoading

  constructor(public payload: boolean) {
  }
}

export type ColumnActionsType = GetColumn |
  SetColumn |
  ToggleLoading
