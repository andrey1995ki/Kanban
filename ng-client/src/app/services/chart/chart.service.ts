import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ApiChartBoardStatistic, ChartBoardStatistic} from "./chart.model";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) {
  }

  getBoardStatistic(): Observable<ChartBoardStatistic> {
    return this.http.get<ApiChartBoardStatistic[]>(`${environment.apiUrl}/chart/board`).pipe(
      map(data=>{
        let title: string[] =[]
        let all: number[] =[]
        let done: number[] =[]
        data.forEach(item=>{
          title = [...title, item.title]
          all = [...all, Number(item.all)]
          done = [...done, Number(item.done)]
        })
        return {title,all, done}
      })
    )
  }
}
