import { Component, inject } from '@angular/core';
import {HomeBlogs} from './home-blogs/home-blogs';
import {HomeEvent} from './home-event/home-event';
import {Testimonials} from './testimonials/testimonials';
import {Testing} from '../testing/testing';
import {CategoriesComponent} from '../admin/dashboard/homepage/categories/categories.component';

import {HomeProducts} from './home-products/home-products';
import {Offers} from './offers/offers';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {UploadPost} from '../admin/post/upload-post';
import {AnoymouseHeader} from '../core/anoymouse-header/anoymouse-header';
import {AnoumouseFooter} from '../core/anoumouse-footer/anoumouse-footer';
import {Header} from '../shared/header/header';
import {HeaderComponent} from '../core/header/header.component';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
@Component({
  selector: 'api-homepage',
  imports: [
    HomeBlogs,
    HomeEvent,
    Testimonials,
    CategoriesComponent,
    HomeProducts,
    Offers,
    UploadPost,
    Testing,
    AnoymouseHeader,
    AnoumouseFooter,
    Header,
    HeaderComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  banner = {
    bg: 'assets/img/home/electronics/banner/background.jpg',
    image: 'homepage/tlc-red-t.webp',
    title: ' anamunusStyles',
    subtitle: 'We are the best',
    priceText: 'From $1,199',
    link: '#!'
  };

  productsLeft = [
    {
      image: 'assets/img/shop/electronics/thumbs/01.png',
      title: 'Smart Watch Series 7, White',
      rating: 5,
      reviews: 45,
      price: 'Watches',
      link: 'shop-product-general-electronics.html'
    },
    {
      image: 'homepage/aimax.jpg',
      title: 'VRB01 Virtual Reality Glasses',
      rating: 3.5,
      reviews: 123,
      price: 'Shoes',
      link: 'shop-product-general-electronics.html'
    },
    {
      image: 'assets/img/shop/electronics/thumbs/05.png',
      title: 'Wireless Bluetooth Headphones Sony',
      rating: 4,
      reviews: 34,
      price: 'Music',
      link: 'shop-product-general-electronics.html'
    },
    {
      image: 'homepage/chain.webp',
      title: 'Laptop Apple MacBook Pro 13 M2',
      rating: 5,
      reviews: 34,
      price: 'Chains',
      link: 'shop-product-general-electronics.html'
    }
  ];

  productsRight = [
    {
      image: 'homepage/glass.webp',
      title: 'Tablet Apple iPad Air M1',
      rating: 4,
      reviews: 126,
      price: 'Sunglasses',
      link: 'shop-product-general-electronics.html'
    },
    {
      image: 'homepage/jeans.jpg',
      title: 'Headphones Apple AirPods 2 Pro',
      rating: 5,
      reviews: 340,
      price: 'Trousers',
      oldPrice: '$356.00',
      link: 'shop-product-general-electronics.html'
    },
    {
      image: 'homepage/pcap.avif',
      title: 'Power Bank PBS 10000 mAh Black',
      rating: 4,
      reviews: 29,
      price: 'Caps',
      link: 'shop-product-general-electronics.html'
    },
    {
      image: 'homepage/crazyshirt.webp',
      title: 'Apple iPhone 14 128GB White',
      rating: 5,
      reviews: 12,
      price: 'Shirts',
      oldPrice: '$958.00',
      link: 'shop-product-general-electronics.html'
    }
  ];


  private firestore: Firestore = inject(Firestore);

  async addTestData() {
    try {
      // Reference to the collection
      const blogCollection = collection(this.firestore, 'blogPosts');

      // Data to add
      const data = {
        title: 'AngularFire Test Post',
        shortDescription: 'Testing Firestore',
        content: 'This is some test content',
        category: 'Test',
        publishDate: new Date(),
        tags: ['angularfire', 'test', 'firestore']
      };

      // Add document
      const docRef = await addDoc(blogCollection, data);
      console.log('Document added with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }
}
