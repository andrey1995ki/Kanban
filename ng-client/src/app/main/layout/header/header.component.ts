import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {BoardService} from "../../../services/board/board.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskFormComponent} from "../../shared/forms/task-form/task-form.component";
import {modalConfig} from "../../shared/modal/modal.config";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/store";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {getBoardsLength} from "../../../store/board";
import {getColumnsLength} from "../../../store/column";
import {Subject, takeUntil} from "rxjs";
import {BoardPreviewComponent} from "../../board/board-preview/board-preview.component";
import {ColumnPreviewComponent} from "../../column/column-preview/column-preview.component";
import {BoardAccessComponent} from "../../board/board-access/board-access.component";
import {Router, RouterLink} from "@angular/router";
import {AppRoutesEnum} from "../../../app-routes/app-routes.enum";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatIcon, MatIconButton, NgIf, MatButton, NgOptimizedImage, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  title!: string
  availableBoards = false
  availableColumns = false
  private destroyed$ = new Subject<null>()

  constructor(private boardService: BoardService, private modal: MatDialog, private store: Store<AppState>) {

  }

  ngOnDestroy(): void {
    this.boardService.boardTitle$.next('')
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.boardService.boardTitle$.subscribe(value => this.title = value)
    this.store.select(getBoardsLength).pipe(takeUntil(this.destroyed$)).subscribe(length => this.availableBoards = length > 0)
    this.store.select(getColumnsLength).pipe(takeUntil(this.destroyed$)).subscribe(length => this.availableColumns = length > 0)
  }

  addTask() {
    this.modal.open(TaskFormComponent, modalConfig)
  }

  showBoards() {
    this.modal.open(BoardPreviewComponent, modalConfig)
  }

  showColumns() {
    this.modal.open(ColumnPreviewComponent, modalConfig)
  }

  showAccess(){
    this.modal.open(BoardAccessComponent, modalConfig)
  }

  protected readonly AppRoutesEnum = AppRoutesEnum;
}
