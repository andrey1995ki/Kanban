import {Action} from "@ngrx/store";
import {Colum} from "./column.model";

export enum ColumnActions {
  GetColumn = '[Column] GetColumn',
  SetColumn = '[Column] SetColumn',
  ToggleLoading = '[Column] ToggleLoading',
  AddColumn = '[Column] AddColumn',
  SetNewColumn = '[Column] SetNewColumn',
}

export class GetColumn implements Action {
  readonly type = ColumnActions.GetColumn

  constructor(public payload: string) {
  }
}

export class SetColumn implements Action {
  readonly type = ColumnActions.SetColumn

  constructor(public payload: { column: Colum[], boardId: string }) {
  }
}

export class ToggleLoading implements Action {
  readonly type = ColumnActions.ToggleLoading

  constructor(public payload: boolean) {
  }
}

export class AddColumn implements Action {
  readonly type = ColumnActions.AddColumn

  constructor(public payload: Omit<Colum, 'id'>) {
  }
}

export class SetNewColumn implements Action {
  readonly type = ColumnActions.SetNewColumn

  constructor(public payload: Colum) {
  }
}

export type ColumnActionsType = GetColumn |
  SetColumn |
  ToggleLoading | AddColumn | SetNewColumn
