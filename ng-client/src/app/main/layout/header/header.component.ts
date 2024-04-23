import {Component, OnInit} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {BoardService} from "../../../services/board/board.service";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatIcon, MatIconButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  title!: string

  constructor(private boardService: BoardService) {

  }

  ngOnInit(): void {
    this.boardService.boardTitle$.subscribe(value => this.title = value)

  }
}
