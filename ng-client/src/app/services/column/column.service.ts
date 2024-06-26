import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {delay, Observable} from "rxjs";
import {ApiGetColumnResponse} from "./column.model";

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(private http: HttpClient) {
  }

  getColumn(board_id: string) {
    return this.http.get<ApiGetColumnResponse[]>(`${environment.apiUrl}/board_column?board_id=${board_id}`).pipe(delay(3000))
  }

  addColumn(column: Omit<ApiGetColumnResponse, 'id'>) {
    return this.http.post<ApiGetColumnResponse>(`${environment.apiUrl}/board_column`, column).pipe(delay(1000))
  }

  editColumn(column: ApiGetColumnResponse) {
    return this.http.put(`${environment.apiUrl}/board_column/${column.id}`, column)
  }

  deleteColumn(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/board_column/${id}`)
  }
}
