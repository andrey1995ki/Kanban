import {ActionReducerMap} from "@ngrx/store";
import * as AppReducers from './app/app.reducers'
import {AppActionsType} from "./app/app.actions";


export interface State {
  app: AppReducers.AppState
}

export type UnionAction = AppActionsType
export const reducers: ActionReducerMap<State, UnionAction> = {
  app: AppReducers.appReducer
}
