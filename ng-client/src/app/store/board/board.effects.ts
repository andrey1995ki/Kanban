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
  createBoards$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.AddBoard),
    exhaustMap(
      (value) => this.boardService.addBoard(value['payload']).pipe(
        map(board => ({type: BoardActions.SetNewBoard, payload: board})),
        catchError(() => EMPTY)
      )
    )
  ))
  editBoards$ = createEffect(() => this.actions$.pipe(
      ofType(BoardActions.ChangeBoard),
      exhaustMap(
        (value) => this.boardService.changeBoard(value['payload']).pipe(
          map(() => ({type: BoardActions.SetChangeBoard, payload: value['payload']})),
          catchError(() => EMPTY)
        )
      )
    )
  )
  deleteBoards$ = createEffect(() => this.actions$.pipe(
      ofType(BoardActions.DeleteBoard),
      exhaustMap(
        (value) => this.boardService.deleteBoard(value['payload']).pipe(
          map(() => ({type: BoardActions.SetDeleteBoard, payload: value['payload']})),
          catchError(() => EMPTY)
        )
      )
    )
  )

  constructor(private actions$: Actions, private boardService: BoardService) {
  }
}
