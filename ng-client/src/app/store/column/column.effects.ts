import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ColumnService} from "../../services/column/column.service";
import {ColumnActions} from "./column.actions";
import {catchError, EMPTY, exhaustMap, map} from "rxjs";

@Injectable()
export class ColumnEffects {
  getColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(ColumnActions.GetColumn),
      exhaustMap(
        (value) =>
          this.columnService.getColumn(value['payload']).pipe(
            map((columns) => ({type: ColumnActions.SetColumn, payload: columns})),
            catchError(() => EMPTY)
          )
      )
    )
  )

  constructor(private actions$: Actions, private columnService: ColumnService) {
  }
}
