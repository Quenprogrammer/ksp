import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase',
  standalone: true
})
export class UppercasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value; // Return the original value if it's null or undefined
    return value.toUpperCase(); // Transform to uppercase
  }

}
