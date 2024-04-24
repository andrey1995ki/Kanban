import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {BoardService} from "../../services/board/board.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/store";
import {switchMap} from "rxjs";
import {getBoardById} from "../../store/board";
import {ColumnComponent} from "../column/column.component";
import {CdkDropListGroup} from "@angular/cdk/drag-drop";
import {GetColumn} from "../../store/column/column.actions";
import {getColumns, getLoadingColumns} from "../../store/column";
import {SkeletonColumnComponent} from "../shared/loading/skeleton-column/skeleton-column.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    AsyncPipe,
    ColumnComponent,
    CdkDropListGroup,
    NgForOf,
    NgIf,
    SkeletonColumnComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  boardId!: string
  loadingColumn$ = this.store.select(getLoadingColumns)
  column$ = this.store.select(getColumns)

  constructor(private route: ActivatedRoute, private boardService: BoardService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((param) => {
        this.boardId = param['id']
        console.log(param['id']);
        this.store.dispatch(new GetColumn(this.boardId))
        return this.store.select(getBoardById, this.boardId)
      })
    ).subscribe(board => {
      this.boardService.boardTitle$.next(board?.[0]?.title)
    })

  }
}
