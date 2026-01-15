import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'lh-details',
  imports: [NgForOf, NgIf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  specs = [
    { label: 'Model', value: 'iPhone 14 Plus' },
    { label: 'Manufacturer', value: 'Apple Inc.' },
    {
      label: 'Finish',
      value: 'Ceramic, Glass, Aluminium',
      info: 'Ceramic shield front, Glass back and Aluminium design',
    },
    { label: 'Capacity', value: '128GB' },
    { label: 'Chip', value: 'A15 Bionic chip' },
  ];
}
