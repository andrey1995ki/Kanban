import {Component, Input, OnInit} from '@angular/core';
import {Column} from "../../../../store/column/column.model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/store";
import {ChangeColumn, DeleteColumn} from "../../../../store/column/column.actions";


@Component({
  selector: 'app-column-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatFormField,
    MatHint,
    MatIcon,
    MatIconButton,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatLabel,
    MatSlideToggle
  ],
  templateUrl: './column-item.component.html',
  styleUrl: './column-item.component.scss'
})
export class ColumnItemComponent implements OnInit {
  @Input()
  column!: Column
  editColumn!: Column
  editBoard = false

  constructor(private store: Store<AppState>) {
  }


  ngOnInit(): void {
    this.setEditData()
  }


  toggleEdit(edit: boolean) {
    this.editBoard = edit
  }

  endEdit() {
    this.toggleEdit(false)
    this.setEditData()
  }

  setEditData() {
    this.editColumn = {...this.column}
  }

  deleteColumn() {
    this.store.dispatch(new DeleteColumn(this.column.id))
  }

  changeColumn() {
    if (this.editColumn.title.length > 0) {
      this.store.dispatch(new ChangeColumn(this.editColumn))
    }
  }
}
