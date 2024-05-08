import {BoardState} from "./board.model";
import {BoardActions, BoardsActionsType} from "./board.actions";


const initialState: BoardState = {
  boards: [],
  boardsLoading: false
}

export const boardReducer = (state = initialState, action: BoardsActionsType): BoardState => {
  switch (action.type) {
    case BoardActions.GetBoards:
      return {
        ...state,
        boardsLoading: true
      }
    case BoardActions.SetBoards:
      return {
        boardsLoading: false,
        boards: action.payload
      }
    case BoardActions.SetNewBoard:
      return {
        ...state,
        boards: [...state.boards, action.payload]
      }
    case BoardActions.DeleteBoard:
      return {
        ...state,
        boards: state.boards.filter(board => board.id !== action.payload)
      }
    case BoardActions.ChangeBoard:
      return {
        ...state,
        boards: state.boards.map(board => {
          if (board.id === action.payload.id) {
            return {...action.payload}
          }
          return board
        })
      }
    default:
      return state
  }
}
