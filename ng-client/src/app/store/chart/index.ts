import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ChartState} from "./chart.model";

export const getChartStore = createFeatureSelector<ChartState>('chart')
export const getBoardsStatistic = createSelector(getChartStore, (state: ChartState) => state.boardStatistic)
export const getBoardsStatisticLoading = createSelector(getChartStore, (state: ChartState) => state.BSLoading)
