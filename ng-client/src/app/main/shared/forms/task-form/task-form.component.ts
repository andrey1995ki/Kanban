import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../modal/modal.component";
import {ChangeTaskData, CreateTaskData, Task} from "../../../../store/task/task.model";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCard, MatCardContent} from "@angular/material/card";
import {AppState} from "../../../../store/store";
import {Store} from "@ngrx/store";
import {getAvailableStatusColumn, getCurrentBoardId} from "../../../../store/column";
import {Subject, takeUntil} from "rxjs";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {NgForOf} from "@angular/common";
import {CreateTask, EditTask} from "../../../../store/task/task.actions";


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ModalComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatCard,
    MatCardContent,
    MatSelect,
    MatOption,
    MatIconModule,
    MatIconButton,
    MatListModule,
    NgForOf
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit, OnDestroy {
  private initData: Partial<Task> = {
    title: '',
    description: '',
    sub_task: [],
    board_column_id: undefined,
    board_id: ''
  }
  private destroyed$ = new Subject<null>()
  @ViewChild('subTask') private subTaskInput: ElementRef | undefined
  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent | undefined
  @Input()
  editable: boolean = false
  @Input()
  taskData: Partial<Task> = this.initData
  form!: FormGroup
  @Output()
  closeEdit = new EventEmitter<unknown>()

  availableStatus!: Array<{ title: string, id: string }>

  constructor(private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.store.select(getAvailableStatusColumn).pipe(takeUntil(this.destroyed$)).subscribe(status => this.availableStatus = status)
    const defaultStatus = this.taskData.board_column_id || this.availableStatus[0].id
    this.form = new FormGroup({
      title: new FormControl(this.taskData.title, [Validators.required]),
      description: new FormControl(this.taskData.description, [Validators.required]),
      status: new FormControl(defaultStatus),
      subTask: new FormArray(this.taskData.sub_task?.map(task => new FormControl(task)) || [])
    })
  }

  onDismiss() {
    if (this.editable) {
      this.closeEdit.emit()
    } else {
      this.form.controls['description'].reset()
      this.form.controls['title'].reset();
      (this.form.get('subTask') as FormArray).clear()
      this.form.controls['status'].setValue(this.taskData.board_column_id || this.availableStatus[0].id)
    }
  }

  addSubTask() {
    if (!!this.subTaskInput?.nativeElement.value) {
      const subTask = {
        id: '',
        title: this.subTaskInput.nativeElement.value,
        final: false
      }

      this.subTaskInput.nativeElement.value = ""
      const control = new FormControl(subTask) as FormControl
      (this.form.get('subTask') as FormArray).push(control)
    }
  }

  removeSubTask(subTaskIndex: number) {
    (this.form.get('subTask') as FormArray).removeAt(subTaskIndex)
  }

  submit() {
    this.form.controls['description'].markAsTouched()
    this.form.controls['title'].markAsTouched()
    if (!this.form.valid) {
      return
    }
    const taskData = {
      board_column_id: this.form.value['status'],
      board_id: this.taskData.board_id,
      title: this.form.value['title'],
      description: this.form.value['description'],
      sub_task: this.form.value['subTask']
    }
    if (!taskData.board_id) {
      this.store.select(getCurrentBoardId).pipe(takeUntil(this.destroyed$)).subscribe(boardId => taskData.board_id = boardId)
    }
    if (this.editable) {
      this.store.dispatch(new EditTask({taskData: taskData as ChangeTaskData, taskId: this.taskData.id!}))
      this.modal?.closeModal()
    } else {
      this.store.dispatch(new CreateTask(taskData as CreateTaskData))
      this.modal?.closeModal()
    }
  }
}
