import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ThemeService} from "./services/theme/theme.service";
import {LoaderComponent} from "./main/shared/loading/loader/loader.component";
import {AuthService} from "./services/auth/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "./store/store";
import {AsyncPipe, NgIf} from "@angular/common";
import {isLoading} from "./store/auth";
import {Actions, ofType} from "@ngrx/effects";
import {AuthActions} from "./store/auth/auth.actions";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLoading$ = this.store.select(isLoading)

  constructor(private themeService: ThemeService,
              private authService: AuthService,
              private store: Store<AppState>,
              private actions$: Actions,
              private router: Router) {
  }

  ngOnInit(): void {
    this.themeService.setTheme()
    this.authService.getTokenFromCache()
    this.actions$.pipe(
      ofType(AuthActions.SetError)
    ).subscribe(
      () => {
        this.authService.logout()
        this.router.navigate(['/kanban', 'login'])
      }
    )
  }
}
