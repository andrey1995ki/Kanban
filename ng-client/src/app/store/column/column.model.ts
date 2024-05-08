import {ApiGetColumnResponse} from "../../services/column/column.model";

export type Colum = ApiGetColumnResponse

export interface ColumnState {
  column: Colum[]
  board_id: string | undefined
  isLoading: boolean
}
