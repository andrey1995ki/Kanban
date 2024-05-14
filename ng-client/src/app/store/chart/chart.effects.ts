import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ChartService} from "../../services/chart/chart.service";
import {ChartActions} from "./chart.actions";
import {catchError, EMPTY, exhaustMap, map} from "rxjs";

@Injectable()
export class ChartEffects {
  getBoardStatistic$ = createEffect(
    () => this.actions$.pipe(
      ofType(ChartActions.GetBoardStatistic),
      exhaustMap(
        () => this.chartService.getBoardStatistic().pipe(
          map(value => ({type: ChartActions.SetBoardStatistic, payload: value})),
          catchError(() => EMPTY)
        )
      )
    )
  )

  constructor(private actions$: Actions, private chartService: ChartService) {
  }
}
