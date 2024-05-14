import {Action} from "@ngrx/store";
import {Column} from "./column.model";

export enum ColumnActions {
  GetColumn = '[Column] GetColumn',
  SetColumn = '[Column] SetColumn',
  ToggleLoading = '[Column] ToggleLoading',
  AddColumn = '[Column] AddColumn',
  SetNewColumn = '[Column] SetNewColumn',
  DeleteColumn = '[Column] DeleteColumn',
  ChangeColumn = '[Column] ChangeColumn',
  SetDeleteColumn = '[Column] SetDeleteColumn',
  SetChangeColumn = '[Column] SetChangeColumn'
}

export class GetColumn implements Action {
  readonly type = ColumnActions.GetColumn

  constructor(public payload: string) {
  }
}

export class SetColumn implements Action {
  readonly type = ColumnActions.SetColumn

  constructor(public payload: { column: Column[], boardId: string }) {
  }
}

export class ToggleLoading implements Action {
  readonly type = ColumnActions.ToggleLoading

  constructor(public payload: boolean) {
  }
}

export class AddColumn implements Action {
  readonly type = ColumnActions.AddColumn

  constructor(public payload: Omit<Column, 'id'>) {
  }
}

export class SetNewColumn implements Action {
  readonly type = ColumnActions.SetNewColumn

  constructor(public payload: Column) {
  }
}

export class DeleteColumn implements Action {
  readonly type = ColumnActions.DeleteColumn

  constructor(public payload: string) {
  }
}

export class ChangeColumn implements Action {
  readonly type = ColumnActions.ChangeColumn

  constructor(public payload: Column) {
  }
}

export class SetDeleteColumn implements Action {
  readonly type = ColumnActions.SetDeleteColumn

  constructor(public payload: string) {
  }
}

export class SetChangeColumn implements Action {
  readonly type = ColumnActions.SetChangeColumn

  constructor(public payload: Column) {
  }
}


export type ColumnActionsType = GetColumn |
  SetColumn |
  ToggleLoading | AddColumn | SetNewColumn | DeleteColumn | ChangeColumn | SetDeleteColumn |
  SetChangeColumn
