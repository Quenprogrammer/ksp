import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items) return [];
    if (!searchTerm) return items;

    // Convert the search term to lowercase for case-insensitive matching
    searchTerm = searchTerm.toLowerCase();

    // Filter the customer list based on the search term
    return items.filter(item =>
      item.customerName.toLowerCase().includes(searchTerm) ||
      item.gender.toLowerCase().includes(searchTerm)
    );
  }
}
