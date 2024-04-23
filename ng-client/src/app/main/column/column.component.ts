import { Component } from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {CdkDrag, CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [
    TaskComponent,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent {
  bkcolor = "#00539c"

  drop($event: CdkDragDrop<any, any>) {
    console.log($event);
  }
}
