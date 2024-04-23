import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {BoardService} from "../../services/board/board.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/store";
import {switchMap} from "rxjs";
import {getBoardById} from "../../store/board";
import {ColumnComponent} from "../column/column.component";
import {CdkDropListGroup} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    AsyncPipe,
    ColumnComponent,
    CdkDropListGroup
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit{
  boardId!: string
  constructor(private route: ActivatedRoute, private boardService: BoardService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((param) => {
        this.boardId= param['id']
        return this.store.select(getBoardById, this.boardId)
      })
    ).subscribe(board=>{
      console.log(board);
      this.boardService.boardTitle$.next(board?.[0]?.title)
    })
  }
}
