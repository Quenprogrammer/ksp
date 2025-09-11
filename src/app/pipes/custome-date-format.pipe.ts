import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customeDateFormat',
  standalone: true
})
export class CustomeDateFormatPipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

}
