import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-blogs',
  imports: [CommonModule],
  templateUrl: './home-blogs.html',
  styleUrl: './home-blogs.css',
})
export class HomeBlogs {
  featuredArticle = {
    image: 'assets/img/blog/grid/v2/01.jpg',
    category: 'Interior design',
    title: 'Decorate your home for the festive season in 3 easy steps',
    author: 'Ava Johnson',
    date: 'September 11, 2024',
    link: '#!',
    ratio: 'calc(500 / 636 * 100%)'
  };

  articles = [
    {
      image: 'assets/img/blog/grid/v2/11.jpg',
      category: 'Interior design',
      title: 'Transform your living space with these chic interior design tips',
      author: 'Ethan Miller',
      date: 'September 5, 2024',
      link: '#!',
      ratio: 'calc(260 / 306 * 100%)'
    },
    {
      image: 'assets/img/blog/grid/v2/10.jpg',
      category: 'Furniture',
      title: 'Furnishing your space: a guide to choosing the perfect furniture pieces',
      author: 'Oliver Harris',
      date: 'August 23, 2024',
      link: '#!',
      ratio: 'calc(260 / 306 * 100%)'
    }
  ];
}
