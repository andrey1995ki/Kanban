import { Component } from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  template: '<mat-spinner></mat-spinner>',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

}
