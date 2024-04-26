import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {Task} from "../../store/task/task.model";


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
  ngOnInit(): void {
    this.subTaskLength = this.task.sub_task.length
    this.doneSubTask = this.task.sub_task.filter(s=> s.final).length
  }


}
