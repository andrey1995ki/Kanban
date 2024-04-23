import {ApiGetBoardResponse} from "../../services/board/board.model";

export type Board = ApiGetBoardResponse

export interface BoardState {
  boards: Board[]
  boardsLoading: boolean
}
