import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ApiUsersResponse} from "./users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<ApiUsersResponse[]> {
    return this.http.get<ApiUsersResponse[]>(`${environment.apiUrl}/users`)
  }

  getAllUsersByBoard(boardId: string): Observable<ApiUsersResponse[]> {
    return this.http.get<ApiUsersResponse[]>(`${environment.apiUrl}/board/${boardId}/users`)
  }

  addBoardUser(boardId: string, user_id: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/board/${boardId}/users`, {user_id})
  }

  removeBoardUser(boardId: string, user_id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/board/${boardId}/users`, {body: {user_id}})
  }
}
