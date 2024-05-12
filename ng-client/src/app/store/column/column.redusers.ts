import {ColumnState} from "./column.model";
import {ColumnActions, ColumnActionsType} from "./column.actions";

const initialState: ColumnState = {
  column: [],
  board_id: '',
  isLoading: false
}

export const columnReducer = (state = initialState, actions: ColumnActionsType): ColumnState => {
  switch (actions.type) {
    case ColumnActions.SetColumn:
      return {
        column: actions.payload.column,
        board_id: actions.payload.boardId,
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
        column: [],
        board_id: undefined,
        isLoading: true
      }
    }
    case ColumnActions.SetNewColumn:
      return {
        ...state,
        column: [...state.column, actions.payload]
      }
    case ColumnActions.SetChangeColumn:
      return {
        ...state,
        column: state.column.map(column => {
          if (column.id === actions.payload.id) {
            return actions.payload
          }
          return column
        })
      }
    case ColumnActions.SetDeleteColumn:
      return {
        ...state,
        column: state.column.filter(column => column.id !== actions.payload)
      }
    default:
      return state
  }
}
