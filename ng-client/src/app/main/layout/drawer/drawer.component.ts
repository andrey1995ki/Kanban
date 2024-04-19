import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {ThemeService} from "../../../services/theme/theme.service";
import {Observable} from "rxjs";
import {Board} from "../../../Interface/store.interface";
import {Store} from "@ngrx/store";
import {State} from "../../../store/store";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {GetBoards} from "../../../store/app/app.actions";


@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, AsyncPipe, NgIf, NgForOf, RouterLink],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent implements OnInit{
  checkedDarkTheme = this.themeService.isDarkTheme
  boards$: Observable<Board[]> = this.store.select(state => state.app.boards)
  boardsLoading$: Observable<boolean> = this.store.select(state => state.app.boardsLoading)

  constructor(public themeService: ThemeService, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetBoards())
  }

  @Output()
  hideDrawer = new EventEmitter<boolean>();

  setHideDrawer() {
    this.hideDrawer.emit(false)
  }

  setTheme(isCheckedDark: boolean) {
    this.themeService.toggleTheme(isCheckedDark)
    this.checkedDarkTheme = isCheckedDark
  }

  protected readonly length = length;
}
