import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UsersService} from "../../services/users/users.service";
import {UsersActions} from "./users.actions";
import {catchError, EMPTY, exhaustMap, map} from "rxjs";

@Injectable()
export class UsersEffects {
  getUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActions.GetAllUsers),
      exhaustMap(
        () => this.users.getAllUsers().pipe(
          map((users) => ({type: UsersActions.SetAllUsers, payload: users})),
          catchError(() => EMPTY)
        )
      )
    )
  )
  getBoardUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActions.GetBoardUsers),
      exhaustMap(
        (value) => this.users.getAllUsersByBoard(value['payload']).pipe(
          map(users => ({type: UsersActions.SetBoardUsers, payload: users})),
          catchError(() => EMPTY)
        )
      )
    )
  )
  addBoardUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActions.AddBoardUser),
      exhaustMap(
        (value) => this.users.addBoardUser(value['payload']['boardId'], value['payload']['user_id']).pipe(
          map(() => ({type: UsersActions.SetAddBoardUser, payload: value['payload']['user_id']})),
          catchError(() => EMPTY)
        )
      )
    )
  )
  removeBoardUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActions.RemoveBoardUser),
      exhaustMap(
        (value) => this.users.removeBoardUser(value['payload']['boardId'], value['payload']['user_id']).pipe(
          map(() => ({type: UsersActions.SetRemoveBoardUser, payload: value['payload']['user_id']})),
          catchError(() => EMPTY)
        )
      )
    )
  )

  constructor(private actions$: Actions, private users: UsersService) {
  }
}
