import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'statusConversion',
  standalone: true
})
export class StatusConversionPipe implements PipeTransform {

  transform(value: boolean): boolean {
    return !!value;
  }

}
