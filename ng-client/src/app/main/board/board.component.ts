import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {BoardService} from "../../services/board/board.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/store";
import {Subject, switchMap, takeUntil} from "rxjs";
import {getBoardById} from "../../store/board";
import {ColumnComponent} from "../column/column.component";
import {CdkDropListGroup} from "@angular/cdk/drag-drop";
import {GetColumn} from "../../store/column/column.actions";
import {getColumns, getLoadingColumns} from "../../store/column";
import {SkeletonColumnComponent} from "../shared/loading/skeleton-column/skeleton-column.component";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {ColumnFormComponent} from "../shared/forms/column-form/column-form.component";
import {modalConfig} from "../shared/modal/modal.config";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    AsyncPipe,
    ColumnComponent,
    CdkDropListGroup,
    NgForOf,
    NgIf,
    SkeletonColumnComponent,
    MatIcon
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy {
  boardId!: string
  loadingColumn$ = this.store.select(getLoadingColumns)
  column$ = this.store.select(getColumns)
  private destroyed$ = new Subject<null>()

  constructor(private route: ActivatedRoute, private boardService: BoardService, private store: Store<AppState>, private modal: MatDialog) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((param) => {
        this.boardId = param['id']
        this.store.dispatch(new GetColumn(this.boardId))
        return this.store.select(getBoardById, this.boardId)
      })
    ).pipe(takeUntil(this.destroyed$)).subscribe(board => {
      this.boardService.boardTitle$.next(board?.[0]?.title)
    })

  }

  addColumn() {
    this.modal.open(ColumnFormComponent, modalConfig)
  }
}
