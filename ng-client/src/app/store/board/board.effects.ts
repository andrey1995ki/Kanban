import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BoardService} from "../../services/board/board.service";
import {BoardActions} from "./board.actions";
import {catchError, EMPTY, exhaustMap, map} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class BoardEffects {
  loadBoards$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.GetBoards),
    exhaustMap(
      () => this.boardService.getBoard().pipe(
        map(boards => ({type: BoardActions.SetBoards, payload: boards})),
        catchError(() => EMPTY)
      )
    )
  ))

  constructor(private actions$: Actions, private boardService: BoardService) {
  }
}
