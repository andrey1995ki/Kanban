import { Pipe, PipeTransform } from '@angular/core';
import {Column} from "../../store/column/column.model";

@Pipe({
  name: 'filterColumn',
  standalone: true
})
export class FilterColumnPipe implements PipeTransform {

  transform(columns: Column[]| null): Column[] {
    if (!columns){
      return []
    }
    let sortArray = [...columns]
    return sortArray.sort((a,b)=> Number(a.final_stage) - Number(b.final_stage))
  }

}
