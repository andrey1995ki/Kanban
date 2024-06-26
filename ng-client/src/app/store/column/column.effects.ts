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
            map((columns) => ({type: ColumnActions.SetColumn, payload: {column: columns, boardId: value['payload']}})),
            catchError(() => EMPTY)
          )
      )
    )
  )
  addColum$ = createEffect(
    () => this.actions$.pipe(
      ofType(ColumnActions.AddColumn),
      exhaustMap(
        (value) => this.columnService.addColumn(value['payload']).pipe(
          map((column) => ({type: ColumnActions.SetNewColumn, payload: column})),
          catchError(() => EMPTY)
        )
      )
    )
  )
  editColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(ColumnActions.ChangeColumn),
      exhaustMap(
        (value) => this.columnService.editColumn(value['payload']).pipe(
          map(() => ({type: ColumnActions.SetChangeColumn, payload: value['payload']})),
          catchError(() => EMPTY)
        )
      )
    )
  )
  deleteColumn$ = createEffect(
    () => this.actions$.pipe(
      ofType(ColumnActions.DeleteColumn),
      exhaustMap(
        (value) => this.columnService.deleteColumn(value['payload']).pipe(
          map(() => ({type: ColumnActions.SetDeleteColumn, payload: value['payload']})),
          catchError(() => EMPTY)
        )
      )
    )
  )

  constructor(private actions$: Actions, private columnService: ColumnService) {
  }
}
