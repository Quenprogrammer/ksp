import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'lh-models',
  imports: [NgForOf],
  templateUrl: './models.component.html',
  styleUrl: './models.component.scss',
})
export class ModelsComponent {
  models = [
    { id: 'gb-64', label: '64 GB', checked: false },
    { id: 'gb-128', label: '128 GB', checked: true },
    { id: 'gb-256', label: '256 GB', checked: false },
    { id: 'gb-512', label: '512 GB', checked: false },
  ];

  price = '$940.00';
  availability = 'Available to order';
}
