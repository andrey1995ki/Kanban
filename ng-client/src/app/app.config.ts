import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from "./app-routes/app-routes";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {CookieService} from "ngx-cookie-service";
import {provideStore, StoreModule} from '@ngrx/store';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {reducers} from "./store/store";
import {EffectsModule} from '@ngrx/effects';
import {BoardEffects} from "./store/board/board.effects";
import {AuthEffects} from "./store/auth/auth.effects";
import {AppRoutesInterceptor} from "./app-routes/app-routes.interceptor";
import {ColumnEffects} from "./store/column/column.effects";
import {TaskEffects} from "./store/task/task.effects";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), CookieService, provideStore(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(StoreModule.forRoot(reducers)
      , EffectsModule.forRoot(
        BoardEffects,
        AuthEffects,
        ColumnEffects,
        TaskEffects
      )
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppRoutesInterceptor,
      multi: true,
    }
  ]
};
