import {Action} from "@ngrx/store";
import {ChartBoardStatistic} from "../../services/chart/chart.model";

export enum ChartActions {
  GetBoardStatistic = '[Chart] GetBoardStatistic',
  SetBoardStatistic = '[Chart] SetBoardStatistic',
  IsLoadingBoardStatistic = '[Chart] IsLoadingBoardStatistic'
}

export class GetBoardStatistic implements Action {
  readonly type = ChartActions.GetBoardStatistic

}

export class SetBoardStatistic implements Action {
  readonly type = ChartActions.SetBoardStatistic

  constructor(public payload: ChartBoardStatistic) {
  }
}

export class IsLoadingBoardStatistic implements Action {
  readonly type = ChartActions.IsLoadingBoardStatistic

  constructor(public payload: boolean) {
  }
}

export type ChartActionsType = GetBoardStatistic | SetBoardStatistic | IsLoadingBoardStatistic

