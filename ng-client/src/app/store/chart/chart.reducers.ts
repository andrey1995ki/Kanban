import {ChartState} from "./chart.model";
import {ChartActions, ChartActionsType} from "./chart.actions";

const initialState: ChartState = {
  boardStatistic: undefined,
  BSLoading: false
}

export const chartReducer = (state = initialState, action: ChartActionsType): ChartState => {
  switch (action.type) {
    case ChartActions.GetBoardStatistic:
      return {
        ...state,
        BSLoading: true
      }
    case ChartActions.SetBoardStatistic:
      return {
        ...state,
        boardStatistic: action.payload,
        BSLoading: false
      }
    default:
      return state
  }
}
