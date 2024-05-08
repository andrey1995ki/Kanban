import {Injectable} from '@angular/core';
import {BehaviorSubject, delay, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiGetBoardResponse} from "./board.model";
import {environment} from "../../../environments/environment";
import {Board} from "../../store/board/board.model";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardTitle$ = new BehaviorSubject<string>('')

  constructor(private http: HttpClient) {
  }

  getBoard(): Observable<ApiGetBoardResponse[]> {
    return this.http.get<ApiGetBoardResponse[]>(`${environment.apiUrl}/board`).pipe(delay(3000))
  }

  addBoard(title: string): Observable<ApiGetBoardResponse> {
    return this.http.post<ApiGetBoardResponse>(`${environment.apiUrl}/board`, {title}).pipe(delay(3000))
  }

  changeBoard(board: Board): Observable<any> {
    return this.http.patch<ApiGetBoardResponse>(`${environment.apiUrl}/board/${board.id}`, {title: board.title})
  }

  deleteBoard(id: string): Observable<any> {
    console.log(id);
    return this.http.delete(`${environment.apiUrl}/board/${id}`)
  }
}
