import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {ThemeService} from "../../../services/theme/theme.service";
import {Observable} from "rxjs";
import {Board} from "../../../store/board/board.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/store";
import {AsyncPipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {getBoards, getLoadingBoards} from "../../../store/board";
import {AuthService} from "../../../services/auth/auth.service";
import {GetBoards} from "../../../store/board/board.actions";
import {getUser} from "../../../store/auth";
import {SkeletonBoardComponent} from "../../shared/loading/skeleton-board/skeleton-board.component";
import {GetTask} from "../../../store/task/task.actions";
import {MatDialog} from "@angular/material/dialog";
import {modalConfig} from "../../shared/modal/modal.config";
import {BoardFormComponent} from "../../shared/forms/board-form/board-form.component";
import {AppRoutesEnum} from "../../../app-routes/app-routes.enum";


@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, AsyncPipe, NgIf, NgForOf, RouterLink, RouterLinkActive, TitleCasePipe, SkeletonBoardComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent implements OnInit {
  @Output()
  hideDrawer = new EventEmitter<boolean>();
  checkedDarkTheme = this.themeService.isDarkTheme
  boards$: Observable<Board[]> = this.store.select(getBoards)
  boardsLoading$: Observable<boolean> = this.store.select(getLoadingBoards)
  currentUser: string | undefined

  constructor(public themeService: ThemeService, private store: Store<AppState>, private router: Router, private authService: AuthService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetBoards())
    this.store.select(getUser).subscribe((user) => this.currentUser = user)
    this.store.dispatch(new GetTask())
  }

  setHideDrawer() {
    this.hideDrawer.emit(false)
  }

  setTheme(isCheckedDark: boolean) {
    this.themeService.toggleTheme(isCheckedDark)
    this.checkedDarkTheme = isCheckedDark
  }

  protected readonly length = length;

  logout() {
    this.authService.logout()
    this.router.navigate(['/kanban', 'login'])
  }

  openModal() {
    this.dialog.open(BoardFormComponent, modalConfig)
  }

  protected readonly AppRoutesEnum = AppRoutesEnum;
}
