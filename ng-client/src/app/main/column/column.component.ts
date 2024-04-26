import {Component, Input, OnInit} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {CdkDrag, CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";
import {Colum} from "../../store/column/column.model";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/store";
import {getTaskById} from "../../store/task";
import {Task} from "../../store/task/task.model";

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [
    TaskComponent,
    CdkDropList,
    CdkDrag,
    MatIcon,
    NgIf,
    NgForOf
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent implements OnInit {

  @Input()
  column!: Colum
  task!: Task[]

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(getTaskById, this.column.id).subscribe(t => {
      console.log(t);
      this.task = t
    })
  }

  drop($event: CdkDragDrop<any, any>) {
    console.log($event);
  }
}
