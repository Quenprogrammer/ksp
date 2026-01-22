import { Component } from '@angular/core';
interface MediaCategory {
  title: string;
  image: string;
  link: string;
}
@Component({
  selector: 'app-herocards',
  imports: [],
  templateUrl: './herocards.html',
  styleUrl: './herocards.css'
})
export class Herocards {
  mediaCategories: MediaCategory[] = [
    {
      title: 'Music',
      image: 'assets/img/home/marketplace/categories/music.jpg',
      link: '/music'
    },
    {
      title: 'Videos',
      image: 'assets/img/home/marketplace/categories/videos.jpg',
      link: '/videos'
    },
    {
      title: 'Images',
      image: 'assets/img/home/marketplace/categories/images.jpg',
      link: '/images'
    },
    {
      title: 'Shows',
      image: 'assets/img/home/marketplace/categories/shows.jpg',
      link: '/shows'
    }
  ];
}
