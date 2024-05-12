import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Board} from "../../../../store/board/board.model";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/store";
import {ChangeBoard, DeleteBoard} from "../../../../store/board/board.actions";
import {Subject, takeUntil} from "rxjs";
import {getCurrentBoardId} from "../../../../store/column";
import {Router} from "@angular/router";
import {BoardService} from "../../../../services/board/board.service";

@Component({
  selector: 'app-board-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, NgIf,
    MatInputModule, FormsModule],
  templateUrl: './board-item.component.html',
  styleUrl: './board-item.component.scss'
})
export class BoardItemComponent implements OnInit, OnDestroy {
  @Input()
  board!: Board
  boardTitle = ''
  editBoard = false
  currentBoard: string | undefined
  private destroyed$ = new Subject<null>()

  constructor(private store: Store<AppState>, private route: Router, private boardService: BoardService) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.store.select(getCurrentBoardId).pipe(takeUntil(this.destroyed$)).subscribe(board => this.currentBoard = board)
    this.boardTitle = this.board.title
  }

  toggleEdit(edit: boolean) {
    this.editBoard = edit
  }

  deleteBoard() {
    if (this.board.id === this.currentBoard) {
      this.boardService.boardTitle$.next('')
      this.route.navigate(['/kanban'])
    }
    this.store.dispatch(new DeleteBoard(this.board.id))
  }

  changeBoard() {
    if (this.board.title.length > 0) {
      this.store.dispatch(new ChangeBoard({...this.board, title: this.boardTitle}))
    }
  }
}
