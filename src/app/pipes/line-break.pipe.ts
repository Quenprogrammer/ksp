import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak',
  standalone: true
})
export class LineBreakPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value; // If value is undefined or null, return it as is
    return value.replace(/\*/g, '<br>*'); // Replace '*' with '<br>*'
  }

}
