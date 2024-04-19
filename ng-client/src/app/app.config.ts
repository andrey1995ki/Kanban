import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from "./app-routes/app-routes";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {CookieService} from "ngx-cookie-service";
import {provideStore, StoreModule} from '@ngrx/store';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {reducers} from "./store/store";
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from "./store/app/app.effects";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), CookieService, provideStore(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(StoreModule.forRoot(reducers)
      , EffectsModule.forRoot(AppEffects)
    )]
};
