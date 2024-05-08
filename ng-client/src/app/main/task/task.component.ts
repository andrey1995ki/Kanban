import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {Task} from "../../store/task/task.model";
import {TaskPreviewComponent} from "./task-preview/task-preview.component";
import {modalConfig} from "../shared/modal/modal.config";
import {MatDialog} from "@angular/material/dialog";
import {TaskService} from "../../services/task/task.service";


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit{

  @Input()
  task!:Task
  subTaskLength!:number
  doneSubTask!:number
  constructor(private modal: MatDialog, private taskService: TaskService) {
  }
  ngOnInit(): void {
    this.subTaskLength = this.task.sub_task.length
    this.doneSubTask = this.task.sub_task.filter(s=> s.final).length
  }
  openTask() {
    this.taskService.selectedTask$.next(this.task.id)
    this.modal.open(TaskPreviewComponent, modalConfig)
  }

}
