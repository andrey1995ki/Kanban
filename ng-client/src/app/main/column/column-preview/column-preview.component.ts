import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Column} from "../../../store/column/column.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/store";
import {getColumns} from "../../../store/column";
import {ModalComponent} from "../../shared/modal/modal.component";
import {MatList} from "@angular/material/list";
import {ColumnItemComponent} from "./column-item/column-item.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-column-preview',
  standalone: true,
  imports: [
    ModalComponent,
    MatList,
    ColumnItemComponent,
    NgForOf
  ],
  templateUrl: './column-preview.component.html',
  styleUrl: './column-preview.component.scss'
})
export class ColumnPreviewComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<null>()
  columns!: Column[]
  columnLength = 0

  constructor(private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.store.select(getColumns).pipe(takeUntil(this.destroyed$)).subscribe(columns => this.columns = columns)
    this.columnLength = this.columns.length
  }
}
