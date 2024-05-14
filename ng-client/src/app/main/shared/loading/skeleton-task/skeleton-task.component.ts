import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-skeleton-task',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle
  ],
  templateUrl: './skeleton-task.component.html',
  styleUrl: './skeleton-task.component.scss'
})
export class SkeletonTaskComponent {

}
