import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/store";
import {Actions, ofType} from "@ngrx/effects";
import {AuthService} from "../../../services/auth/auth.service";
import {Subject, takeUntil} from "rxjs";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AsyncPipe, NgIf} from "@angular/common";
import {CustomValidators} from "../../../validators/CustomValidators";
import {ApiUserRegistration} from "../../../services/auth/auth.model";
import {AuthActions, Registration} from "../../../store/auth/auth.actions";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {MatCardFooter} from "@angular/material/card";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatProgressSpinner,
    NgIf,
    ReactiveFormsModule,
    AsyncPipe,
    MatCardFooter
  ],
  templateUrl: './registration.component.html',
  styleUrl: '../auth.component.scss'
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<null>()
  form!: FormGroup
  submitted = false;
  loadingError: string | undefined

  constructor(private store: Store<AppState>, private actions$: Actions, public auth: AuthService, private dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {validators: CustomValidators.MatchPassword})

    this.auth.registrError$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((message) => {
      this.submitted = false
      this.loadingError = message
    })
  }

  registration() {
    if (!this.form.valid) {
      return
    }
    this.submitted = true
    const User: ApiUserRegistration = {
      login: this.form.value.login,
      name: this.form.value.name,
      password: this.form.value.password
    }
    this.store.dispatch(new Registration(User))
    this.actions$.pipe(
      ofType(AuthActions.SuccessRegist),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.dialog.open(DialogComponent)
    })
  }
}
