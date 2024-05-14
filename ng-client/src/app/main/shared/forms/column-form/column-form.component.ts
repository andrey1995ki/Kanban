import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "../../modal/modal.component";
import {Subject, takeUntil} from "rxjs";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/store";
import {Actions, ofType} from "@ngrx/effects";
import {NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {AddColumn, ColumnActions} from "../../../../store/column/column.actions";
import {getCurrentBoardId} from "../../../../store/column";

@Component({
  selector: 'app-column-form',
  standalone: true,
  imports: [
    ModalComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    MatProgressSpinner,
    MatCard,
    MatCardContent,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSlideToggle,
  ],
  templateUrl: './column-form.component.html',
  styleUrl: './column-form.component.scss'
})
export class ColumnFormComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<null>()
  form!: FormGroup
  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent | undefined
  submitted = false
  boardId!: string

  constructor(private store: Store<AppState>, private actions$: Actions) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      final_stage: new FormControl(false),
      color: new FormControl(this.generateColor())
    })
    this.store.select(getCurrentBoardId).pipe(takeUntil(this.destroyed$)).subscribe(boardId => this.boardId = boardId!)
  }

  private generateColor() {
    const char = '0123456789ABCDEF'
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += char[Math.floor(Math.random() * char.length)];
    }
    return color
  }

  submit() {
    this.form.controls['title'].markAsTouched()
    if (!this.form.valid) {
      return
    }
    this.store.dispatch(new AddColumn({...this.form.value, board_id: this.boardId}))
    this.form.controls['title'].reset()
    this.submitted = true
    this.actions$.pipe(
      takeUntil(this.destroyed$),
      ofType(ColumnActions.SetNewColumn)
    ).subscribe(() => {
      this.submitted = false
      this.modal?.closeModal()
    })
  }
}
