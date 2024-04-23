import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../store/store";
import {GetToken} from "../store/auth";

@Injectable()
export class AppRoutesInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string | undefined
    this.store.select(GetToken).subscribe((t) => token = t)
    console.log(token);
    if (token) {
      if (!req.url.includes('user') || !req.url.includes('registration')) {
        const authReq = req.clone({
          headers: req.headers.set('authorization', `Bearer ${token}`)
        })
        return next.handle(authReq)
      }
    }
    return next.handle(req)
  }

}
