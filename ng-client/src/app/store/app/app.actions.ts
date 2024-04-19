import {Action} from "@ngrx/store";
import {Board} from "../../Interface/store.interface";

export enum AppActions {
  GetBoards = '[App] GetBoards',
  SetBoards = '[App] SetBoards',
}

export class GetBoards implements Action {
  readonly type = AppActions.GetBoards
}

export class SetBoards implements Action {
  readonly type = AppActions.SetBoards

  constructor(public payload: Board[]) {
  }
}

export type AppActionsType = GetBoards | SetBoards
