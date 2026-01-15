import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [
    NgForOf
  ],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class EventsComponent {
  categories = [
    {
      title: 'Fashion',
      image: 'assets/img/home/fashion/v1/popular/01.jpg',
      link: 'shop-catalog-fashion.html'
    },
    {
      title: 'Music',
      image: 'event/img.png',
      link: 'shop-catalog-music.html'
    },
    {
      title: 'Boutique',
      image: 'assets/img/shop/marketplace/02.jpg',
      link: 'shop-catalog-boutique.html'
    },
    {
      title: 'Accessories',
      image: 'assets/img/blog/grid/v1/01.jpg',
      link: 'shop-catalog-accessories.html'
    },

  ];

}
