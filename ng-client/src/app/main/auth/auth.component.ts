import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, NgIf} from "@angular/common";
import {User} from "../../services/auth/auth.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/store";
import {AuthActions, Login} from "../../store/auth/auth.actions";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {Actions, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth/auth.service";
import {isLoading} from "../../store/auth";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatTabsModule} from '@angular/material/tabs';
import {RegistrationComponent} from "./registration/registration.component";


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInput, MatCardModule, MatButton, NgIf, AsyncPipe, MatProgressSpinner, MatTabsModule, RegistrationComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy {
  form!: FormGroup
  submitted = false
  private destroyed$ = new Subject<null>()
  loadingError: string | undefined

  constructor(private store: Store<AppState>, private actions$: Actions, private router: Router, public auth: AuthService) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
    this.auth.error$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((message) => {
      this.submitted = false
      this.loadingError = message
    })
  }

  login() {
    if (!this.form.valid) {
      return;
    }
    this.submitted = true
    const User: User = {
      login: this.form.value.login,
      password: this.form.value.password
    }
    this.store.dispatch(new Login(User))
    this.actions$.pipe(
      ofType(AuthActions.SetAuth),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/kanban'])
    })
  }

  protected readonly isLoading = isLoading;
}
