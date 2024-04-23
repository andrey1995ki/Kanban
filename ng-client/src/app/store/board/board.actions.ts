import {Action} from "@ngrx/store";
import {Board} from "./board.model";

export enum BoardActions {
  GetBoards = '[App] GetBoards',
  SetBoards = '[App] SetBoards',
}

export class GetBoards implements Action {
  readonly type = BoardActions.GetBoards
}

export class SetBoards implements Action {
  readonly type = BoardActions.SetBoards

  constructor(public payload: Board[]) {
  }
}

export type BoardsActionsType = GetBoards | SetBoards
