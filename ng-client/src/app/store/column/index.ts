import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ColumnState} from "./column.model";

const getColumnStore = createFeatureSelector<ColumnState>('column')

export const getColumns = createSelector(getColumnStore, (state: ColumnState) => state.column
)
export const getLoadingColumns = createSelector(getColumnStore, (state: ColumnState) => state.isLoading)

export const getStatusColumn = createSelector(getColumnStore, (state: ColumnState, columnId: string)=> state.column.find(column=> column.id === columnId)?.final_stage)

export const getAvailableStatusColumn = createSelector(getColumnStore, (state: ColumnState)=> state.column.map(column=> ({title: column.title,id: column.id})))

export const getColumnsLength = createSelector(getColumnStore, (state: ColumnState) => state.column?.length || 0)
export const getCurrentBoardId = createSelector(getColumnStore, (state:ColumnState)=>state.board_id)
