import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiGetBoardResponse} from "../../../Interface/api.interface";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  getBoard(): Observable<ApiGetBoardResponse[]>{
    return this.http.get<ApiGetBoardResponse[]>('http://localhost:3001/kanban/api/board')
  }
}
