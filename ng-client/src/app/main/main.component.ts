import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatSidenavModule} from '@angular/material/sidenav';
import {DrawerComponent} from "./layout/drawer/drawer.component";
import {RouterOutlet} from "@angular/router";
import {MatMiniFabButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {NgIf} from "@angular/common";
import {HeaderComponent} from "./layout/header/header.component";


@Component({
  selector: 'board-main',
  standalone: true,
  imports: [
    MatToolbar,
    MatSidenavModule,
    DrawerComponent,
    RouterOutlet,
    MatMiniFabButton,
    MatIconModule,
    NgIf,
    HeaderComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  drawerIsOpen = true

  setOpenedDrawer(isOpen: boolean) {
    this.drawerIsOpen = isOpen
  }
}
