import {Injectable} from '@angular/core';
import {BehaviorSubject, delay, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiGetBoardResponse} from "./board.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardTitle$ = new BehaviorSubject<string>('')

  constructor(private http: HttpClient) { }

  getBoard(): Observable<ApiGetBoardResponse[]>{
    return this.http.get<ApiGetBoardResponse[]>(`${environment.apiUrl}/board`).pipe(delay(3000))
  }
}
