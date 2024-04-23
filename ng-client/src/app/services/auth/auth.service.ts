import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/store";
import {GetUser, SetToken, ToggleLoading} from "../../store/auth/auth.actions";
import {environment} from "../../../environments/environment";
import {catchError, delay, Observable, ObservableInput, Subject, tap, throwError} from "rxjs";
import {ApiGetUserResponse, ApiLoginResponse, User} from "./auth.model";
import {GetToken} from "../../store/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error$: Subject<string> = new Subject<string>()
  private token = this.cookieService.get('Token') || undefined

  constructor(private http: HttpClient, private cookieService: CookieService, private store: Store<AppState>) {
  }

  isAuth() {
    let token: string | undefined = undefined
    this.store.select(GetToken).subscribe((t) => token = t)
    return this.token || token
  }

  getTokenFromCache() {
    if (this.token) {
      this.store.dispatch(new SetToken({token: this.token}))
      this.store.dispatch(new GetUser())
    }
  }

  login(user: User): Observable<ApiLoginResponse> {
    return this.http.post<ApiLoginResponse>(`${environment.apiUrl}/auth/login`, user).pipe(
      delay(3000),
      tap(response => {
        console.log(response);
        this.cookieService.set('Token', response.token, {expires: 24, path: '/'})
      }),
      catchError(this.handleError.bind(this))
    )
  }

  logout() {
    this.store.dispatch(new SetToken({token: undefined}))
    this.cookieService.delete('Token', '/')
  }

  getUserData(): Observable<ApiGetUserResponse> {
    this.store.dispatch(new ToggleLoading(true))
    return this.http.get<ApiGetUserResponse>(`${environment.apiUrl}/auth/user`).pipe(
      delay(3000),
      catchError(this.handleError.bind(this))
    )
  }

  private handleError(error: HttpErrorResponse): ObservableInput<any> {
    const {message} = error.error
    this.error$.next(message)
    return throwError(() => error)
  }
}
