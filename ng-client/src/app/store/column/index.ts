import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ColumnState} from "./column.model";

const getColumnStore = createFeatureSelector<ColumnState>('column')

export const getColumns = createSelector(getColumnStore, (state: ColumnState) =>{
    console.log(state);
    return state.column
  }
)

export const getLoadingColumns = createSelector(getColumnStore, (state: ColumnState) => state.isLoading)
