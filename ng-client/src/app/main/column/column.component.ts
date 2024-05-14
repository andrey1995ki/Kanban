import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList} from "@angular/cdk/drag-drop";
import {Column} from "../../store/column/column.model";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/store";
import {getTaskByColumn} from "../../store/task";
import {Task} from "../../store/task/task.model";
import {EditTask} from "../../store/task/task.actions";
import {Subject, takeUntil} from "rxjs";
import {StatusConversionPipe} from "../../pipes/status-conversion/status-conversion.pipe";

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [
    TaskComponent,
    CdkDropList,
    CdkDrag,
    MatIcon,
    NgIf,
    NgForOf,
    CdkDragPlaceholder,
    StatusConversionPipe
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent implements OnInit, OnDestroy {

  @Input()
  column!: Column
  task!: Task[]
  lengthTask!: Number
  dragEnter = false
  private destroyed$ = new Subject<null>()

  constructor(private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.store.select(getTaskByColumn, this.column.id).pipe(takeUntil(this.destroyed$)).subscribe(t => {
      this.task = t
      this.lengthTask = this.task.length
    })
  }

  drop(event$: CdkDragDrop<any, any>) {
    const previousColumnID = event$.previousContainer.data
    const newColumnID = event$.container.data
    const taskID = event$.item.element.nativeElement.id
    if (previousColumnID !== newColumnID) {
      this.store.dispatch(new EditTask({taskId: taskID, taskData: {board_column_id: newColumnID}}))
    }
  }

  enter() {
    this.dragEnter = true
  }

  exited() {
    this.dragEnter = false
  }
}
