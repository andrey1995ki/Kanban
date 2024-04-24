import {Component, Input} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {CdkDrag, CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";
import {Colum} from "../../store/column/column.model";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [
    TaskComponent,
    CdkDropList,
    CdkDrag,
    MatIcon,
    NgIf
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent {
  @Input()
  column!:Colum

  drop($event: CdkDragDrop<any, any>) {
    console.log($event);
  }
}
