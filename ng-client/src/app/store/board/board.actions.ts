import {Action} from "@ngrx/store";
import {Board} from "./board.model";

export enum BoardActions {
  GetBoards = '[App] GetBoards',
  SetBoards = '[App] SetBoards',
  AddBoard = '[App] AddBoard',
  SetNewBoard = '[App] SetNewBoard',
  DeleteBoard = '[App] DeleteBoard',
  SetDeleteBoard = '[App] SetDeleteBoard',
  ChangeBoard = '[App] ChangeBoard',
  SetChangeBoard = '[App] SetChangeBoard'
}

export class GetBoards implements Action {
  readonly type = BoardActions.GetBoards
}

export class SetBoards implements Action {
  readonly type = BoardActions.SetBoards

  constructor(public payload: Board[]) {
  }
}

export class AddBoard implements Action {
  readonly type = BoardActions.AddBoard

  constructor(public payload: string) {
  }
}

export class SetNewBoard implements Action {
  readonly type = BoardActions.SetNewBoard

  constructor(public payload: Board) {
  }
}

export class DeleteBoard implements Action {
  readonly type = BoardActions.DeleteBoard

  constructor(public payload: String) {
  }
}

export class SetDeleteBoard implements Action {
  readonly type = BoardActions.SetDeleteBoard

  constructor(public payload: String) {
  }
}

export class ChangeBoard implements Action {
  readonly type = BoardActions.ChangeBoard

  constructor(public payload: Board) {
  }
}

export class SetChangeBoard implements Action {
  readonly type = BoardActions.SetChangeBoard

  constructor(public payload: Board) {
  }
}

export type BoardsActionsType =
  GetBoards
  | SetBoards
  | SetNewBoard
  | AddBoard
  | DeleteBoard
  | ChangeBoard
  | SetDeleteBoard
  | SetChangeBoard
