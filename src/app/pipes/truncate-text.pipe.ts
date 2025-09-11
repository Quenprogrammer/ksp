import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: true
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string|undefined, maxLength: number): string {
    if(!value){
      return '';
    }
    if (!value || value.length <= maxLength) {
      return value;
    }

    return value.substring(0, maxLength) + '...';
  }
}
