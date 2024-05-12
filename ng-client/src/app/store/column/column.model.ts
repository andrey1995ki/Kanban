import {ApiGetColumnResponse} from "../../services/column/column.model";

export type Column = ApiGetColumnResponse

export interface ColumnState {
  column: Column[]
  board_id: string | undefined
  isLoading: boolean
}
