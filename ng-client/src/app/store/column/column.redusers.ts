import {ColumnState} from "./column.model";
import {ColumnActions, ColumnActionsType} from "./column.actions";

const initialState: ColumnState = {
  column: [],
  isLoading: false
}

export const columnReducer = (state = initialState, actions: ColumnActionsType): ColumnState => {
  switch (actions.type) {
    case ColumnActions.SetColumn:
      return {
        column: actions.payload,
        isLoading: false
      }
    case ColumnActions.ToggleLoading:
      return {
        ...state,
        isLoading: actions.payload
      }
    case ColumnActions.GetColumn: {
      return {
        ...state,
        isLoading: true
      }
    }
    default:
      return state
  }
}
