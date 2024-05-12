import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {AppState} from "../../../store/store";
import {Store} from "@ngrx/store";
import {BoardService} from "../../../services/board/board.service";
import {Subject, takeUntil} from "rxjs";
import {Users} from "../../../store/users/users.model";
import {getAllUsers, getBoardUsers} from "../../../store/users";
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {NgForOf} from "@angular/common";
import {AddBoardUser, GetAllUsers, GetBoardUsers, RemoveBoardUser} from "../../../store/users/users.actions";
import {getCurrentBoardId} from "../../../store/column";
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {FilterUsersPipe} from "../../../pipes/filter-users/filter-users.pipe";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-board-access',
  standalone: true,
  imports: [
    ModalComponent,
    MatCardModule,
    MatListModule,
    NgForOf,
    DragDropModule,
    FilterUsersPipe,
    MatIcon
  ],
  templateUrl: './board-access.component.html',
  styleUrl: './board-access.component.scss'
})
export class BoardAccessComponent implements OnInit, OnDestroy {
  title!: string
  allUsers!: Users[]
  accessUsers!: Users[]
  private destroyed$ = new Subject<null>()
  private currentBoard!: string

  constructor(private store: Store<AppState>, public boardService: BoardService) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.store.select(getCurrentBoardId).pipe(takeUntil(this.destroyed$)).subscribe(boardId => this.currentBoard = boardId!)
    this.store.dispatch(new GetAllUsers())
    this.store.dispatch(new GetBoardUsers(this.currentBoard))
    this.title = this.boardService.boardTitle$.getValue()
    this.store.select(getAllUsers).pipe(takeUntil(this.destroyed$)).subscribe(users => this.allUsers = users)
    this.store.select(getBoardUsers).pipe(takeUntil(this.destroyed$)).subscribe(users => this.accessUsers = users)
  }

  drop(event$: CdkDragDrop<string, any>) {
    const newColumn = event$.container.data
    const userID = event$.item.element.nativeElement.id
    console.log(newColumn, userID,newColumn==='access')
    if(newColumn==='access'){
      this.store.dispatch(new AddBoardUser({'boardId':this.currentBoard,'user_id':userID}))
    }
    if(newColumn==='nonAccess'){
      this.store.dispatch(new RemoveBoardUser({'boardId':this.currentBoard,'user_id':userID}))
    }
  }
}
