import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth/auth.service";
import {AuthActions} from "./auth.actions";
import {catchError, EMPTY, exhaustMap, map, of} from "rxjs";

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () => this.action$.pipe(
      ofType(AuthActions.Login),
      exhaustMap(
        (value) => this.authService.login(value['payload']).pipe(
          map(user => ({type: AuthActions.SetAuth, payload: user})),
          catchError(() => EMPTY)
        )
      )
    )
  )

  userData$ = createEffect(
    () => this.action$.pipe(
      ofType(AuthActions.GetUser),
      exhaustMap(
        () => this.authService.getUserData().pipe(
          map(user => ({type: AuthActions.SetUser, payload: user})),
          catchError(() => of({type: AuthActions.SetError}))
        )
      )
    )
  )

  registration$ = createEffect(
    () => this.action$.pipe(
      ofType(AuthActions.Registration),
      exhaustMap(
        (value) => this.authService.registration(value['payload']).pipe(
          map(() => ({type: AuthActions.SuccessRegist})),
          catchError(() => of({type: AuthActions.SetError}))
        )),
    )
  )

  constructor(private action$: Actions, private authService: AuthService) {
  }
}
