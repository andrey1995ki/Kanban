import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "../store/store";
import {ToggleLoading} from "../store/auth/auth.actions";
import {GetToken} from "../store/auth";
import {getBoardById} from "../store/board";

export const AppRoutesGuard: CanActivateFn = () => {
  const auth = inject(AuthService)
  const router = inject(Router)
  if (auth.isAuth()) {
    return true
  }
  router.navigate(['/kanban', 'login'])
  return false
}

export const LoginGuard: CanActivateFn = () => {
  const store = inject(Store<AppState>)
  const router = inject(Router)
  let token: string | undefined = undefined
  store.select(GetToken).subscribe((t) => token = t)
  if (!token) {
    store.dispatch(new ToggleLoading(false))
    return true
  }
  router.navigate(['/kanban'])
  return false
}

export const BoardGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store<AppState>)
  const router = inject(Router)
  const id = route.params['id']
  let boardExist: Array<any> = []
  store.select(getBoardById, id).subscribe(b => boardExist = b)
  console.log(boardExist);
  if (!boardExist.length) {
    router.navigate(['/kanban'])
    return false
  }
  return true
}
