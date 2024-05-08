import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {TaskService} from "../../../services/task/task.service";
import {AppState} from "../../../store/store";
import {Store} from "@ngrx/store";
import {Subject, Subscription, takeUntil} from "rxjs";
import {Task} from '../../../store/task/task.model';
import {getTaskById} from "../../../store/task";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {getAvailableStatusColumn, getStatusColumn} from "../../../store/column";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectChange} from "@angular/material/select";
import {DeleteTask, EditTask} from "../../../store/task/task.actions";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {TaskFormComponent} from "../../shared/forms/task-form/task-form.component";

@Component({
  selector: 'app-task-preview',
  standalone: true,
  imports: [
    ModalComponent,
    MatCard,
    MatCardContent,
    NgIf,
    MatSelectionList,
    MatListOption,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatIconButton,
    MatFormField,
    MatSelect,
    MatOption,
    MatProgressSpinner,
    TaskFormComponent
  ],
  templateUrl: './task-preview.component.html',
  styleUrl: './task-preview.component.scss'
})
export class TaskPreviewComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<null>()
  taskData!: Task
  taskTitle: string | undefined
  editable!: boolean
  isEdit = false
  availableStatus!: Array<{ title: string, id: string }>
  private statusStream$ !: Subscription
  @ViewChild(ModalComponent, {static: false}) private modal: ModalComponent | undefined

  constructor(private taskService: TaskService, private store: Store<AppState>) {
  }


  ngOnDestroy(): void {
    this.taskService.selectedTask$.next(undefined)
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    let taskId = this.taskService.selectedTask$.getValue()
    if (taskId) {
      this.store.select(getTaskById, taskId).pipe(takeUntil(this.destroyed$)).subscribe(task => this.taskData = task)
      this.taskTitle = this.taskData?.title
      this.getStatus(this.taskData.board_column_id)
      this.store.select(getAvailableStatusColumn).pipe(takeUntil(this.destroyed$)).subscribe(status => this.availableStatus = status)
    }
  }

  changeTaskStatus($event: MatSelectChange) {
    const newColumnId = $event.value
    this.store.dispatch(new EditTask({taskId: this.taskData.id, taskData: {board_column_id: newColumnId}}))
    this.getStatus(newColumnId)
  }

  getStatus(columnId: string) {
    this.statusStream$ && this.statusStream$.unsubscribe()
    this.statusStream$ = this.store.select(getStatusColumn, columnId).pipe(takeUntil(this.destroyed$)).subscribe(status => this.editable = !!status)
  }

  changeSubTask($event: MatSelectionListChange) {
    const changedSubTask = $event.options[0].value
    const newStatusSubTask = $event.options[0].selected
    const subTask = this.taskData.sub_task.map(task => {
      if (task.id === changedSubTask) {
        return {...task, final: newStatusSubTask}
      }
      return task
    })
    this.store.dispatch(new EditTask({taskId: this.taskData.id, taskData: {sub_task: subTask}}))
  }

  deleteTask(){
    this.store.dispatch(new DeleteTask(this.taskData.id))
    this.modal?.closeModal()
  }
}
