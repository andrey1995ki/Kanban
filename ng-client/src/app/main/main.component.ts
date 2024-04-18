import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatToolbar,
    MatSidenavModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
