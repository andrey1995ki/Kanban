import {ChartBoardStatistic} from "../../services/chart/chart.model";

export interface ChartState {
  boardStatistic: ChartBoardStatistic | undefined
  BSLoading: boolean
}
