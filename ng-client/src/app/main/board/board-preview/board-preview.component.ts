import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/store";
import {Board} from "../../../store/board/board.model";
import {getBoards} from "../../../store/board";
import {Subject, takeUntil} from "rxjs";
import {MatListModule} from '@angular/material/list';
import {BoardItemComponent} from "./board-item/board-item.component";
import {NgForOf} from "@angular/common";



@Component({
  selector: 'app-board-preview',
  standalone: true,
  imports: [
    ModalComponent,
    MatListModule,
    BoardItemComponent,
    NgForOf
  ],
  templateUrl: './board-preview.component.html',
  styleUrl: './board-preview.component.scss'
})
export class BoardPreviewComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject<null>()
  boards!: Board[]
  boardsLength = 0
  constructor(private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.store.select(getBoards).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(boards=> this.boards = boards)
    this.boardsLength = this.boards.length
  }

}
