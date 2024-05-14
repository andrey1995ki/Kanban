import { Component } from '@angular/core';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {TaskComponent} from "../../../task/task.component";
import {SkeletonTaskComponent} from "../skeleton-task/skeleton-task.component";

@Component({
  selector: 'app-skeleton-column',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    MatIcon,
    NgIf,
    TaskComponent,
    SkeletonTaskComponent
  ],
  templateUrl: './skeleton-column.component.html',
  styleUrl: './skeleton-column.component.scss'
})
export class SkeletonColumnComponent {

}
