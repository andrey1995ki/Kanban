import {Board} from "../../Interface/store.interface";
import {AppActions, AppActionsType} from "./app.actions";

export interface AppState {
  boards: Board[]
  boardsLoading: boolean
}

const initialState: AppState = {
  boards: [],
  boardsLoading: false
}

export const appReducer = (state = initialState, action: AppActionsType): AppState => {
  switch (action.type) {
    case AppActions.GetBoards:
      return {
        ...state,
        boardsLoading: true
      }
    case AppActions.SetBoards:
      return {
        ...state,
        boardsLoading: false,
        boards: action.payload
      }
    default:
      return state
  }
}
