import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "../../modal/modal.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/store";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AddBoard, BoardActions} from "../../../../store/board/board.actions";
import {Actions, ofType} from "@ngrx/effects";
import {Subject, takeUntil} from "rxjs";
import {NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    MatCard,
    MatCardContent,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './board-form.component.html',
  styleUrl: './board-form.component.scss'
})
export class BoardFormComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<null>()
  form!: FormGroup
  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent | undefined
  submitted = false

  constructor(private store: Store<AppState>, private actions$: Actions,private router: Router) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required])
    })
  }

  submit() {
    this.form.controls['title'].markAsTouched()
    if (this.form.valid) {
      this.store.dispatch(new AddBoard(this.form.value.title))
      this.submitted = true
      this.form.reset()
    }
    this.actions$.pipe(
      takeUntil(this.destroyed$),
      ofType(BoardActions.SetNewBoard)
    ).subscribe((data) => {
      console.log(data['payload']['id']);
      this.submitted = false
      this.modal?.closeModal()
      this.router.navigate(['/kanban', 'board', data['payload']['id']])
    })
  }
}
