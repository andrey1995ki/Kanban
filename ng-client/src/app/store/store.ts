import {ActionReducerMap} from "@ngrx/store";
import * as BoardReducers from './board/board.reducers'
import {BoardsActionsType} from "./board/board.actions";
import {BoardState} from "./board/board.model";
import {AuthState} from "./auth/auth.model";
import * as AuthReducers from './auth/auth.reducers'
import {AuthActionsType} from "./auth/auth.actions";
import {ColumnState} from "./column/column.model";
import * as ColumReducers from "./column/column.redusers"
import {ColumnActionsType} from "./column/column.actions";
import {TaskState} from "./task/task.model";
import {TaskActionsType} from "./task/task.actions";
import * as TaskReducers from "./task/task.reducers";
import {UsersState} from "./users/users.model";
import {UsersActionsType} from "./users/users.actions";
import * as UsersReducers from "./users/users.reducers";
import {ChartState} from "./chart/chart.model";
import * as ChartReducers from "./chart/chart.reducers";

export interface AppState {
  board: BoardState,
  auth: AuthState,
  column: ColumnState,
  task: TaskState,
  users: UsersState,
  chart: ChartState
}

export type UnionAction =
  BoardsActionsType
  & AuthActionsType
  & ColumnActionsType
  & TaskActionsType
  & UsersActionsType


export const reducers: ActionReducerMap<AppState, UnionAction> = {
  board: BoardReducers.boardReducer,
  auth: AuthReducers.authReducer,
  column: ColumReducers.columnReducer,
  task: TaskReducers.taskReducer,
  users: UsersReducers.usersReducer,
  chart: ChartReducers.chartReducer,
}
