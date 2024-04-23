import {BoardState} from "./board.model";
import {BoardsActionsType, BoardActions} from "./board.actions";


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
        ...state,
        boardsLoading: false,
        boards: action.payload
      }
    default:
      return state
  }
}
