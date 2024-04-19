import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BoardService} from "../../services/api/board/board.service";
import {AppActions} from "./app.actions";
import {catchError, EMPTY, exhaustMap, map} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AppEffects {
  loadBoards$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.GetBoards),
    exhaustMap(
      () => this.boardService.getBoard().pipe(
        map(boards => ({type: AppActions.SetBoards, payload: boards})),
        catchError(() => EMPTY)
      )
    )
  ))

  constructor(private actions$: Actions, private boardService: BoardService) {
  }
}
