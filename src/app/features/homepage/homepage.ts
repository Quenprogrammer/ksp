import { Component, inject } from '@angular/core';
import {HomeBlogs} from './home-blogs/home-blogs';
import {HomeEvent} from './home-event/home-event';
import {Testimonials} from './testimonials/testimonials';
import {Testing} from '../testing/testing';
import {CategoriesComponent} from '../admin/dashboard/homepage/categories/categories.component';
import {CardSliderComponent} from './card-slider/card-slider.component';
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
import {HomeHero} from './home-hero/home-hero';
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
    RouterLink,
    HomeHero,
    CardSliderComponent
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
  newss = [
    {
      id: 1,
      Category: "Web Design",
      Name: "Designing User-Friendly Interfaces",
      Description: "Students were introduced to the principles of user-centered design, learning how to create clean, intuitive, and accessible website interfaces. The training focused on effective navigation structures, logical page layouts, color consistency, typography, and usability testing. Learners practiced wireframing and prototyping techniques to ensure that websites are easy to use for different types of users, including beginners and people accessing sites on mobile devices.",
      Date: "Today",
      Image: "danladiNasidi/post/05.jpg",
      Title: "Designing User-Friendly Interfaces"
    },
    {
      id: 2,
      Category: "Web Design",
      Name: "Creating E-commerce Websites",
      Description: "Entrepreneurship students learned how to plan, design, and build functional e-commerce websites from scratch. The sessions covered product catalog creation, attractive product displays, shopping cart systems, and basic payment gateway integration. Emphasis was placed on user trust, secure checkout processes, and designing layouts that encourage customers to complete purchases successfully.",
      Date: "Yesterday",
      Image: "danladiNasidi/post/web1.jpg",
      Title: "Creating E-commerce Websites"
    },
    {
      id: 3,
      Category: "Web Design",
      Name: "Building a Simple Website with HTML and CSS",
      Description: "Students were taught the foundational skills required to build simple but professional-looking websites using HTML and CSS. The training included structuring web pages with semantic HTML elements, applying styles with CSS, managing layouts, and improving visual appearance. By the end of the session, learners were able to create multi-section web pages suitable for personal or small business use.",
      Date: "Yesterday",
      Image: "danladiNasidi/post/WEB.jpg",
      Title: "Building a Simple Website with HTML and CSS"
    },
    {
      id: 4,
      Category: "Web Design",
      Name: "Creating Responsive Web Pages",
      Description: "Participants practiced designing responsive web pages that automatically adjust to different screen sizes such as mobile phones, tablets, and desktop computers. The lesson focused on flexible layouts, media queries, and mobile-first design strategies. Students learned why responsiveness is critical for modern websites and how it improves accessibility and overall user experience.",
      Date: "Today",
      Image: "danladiNasidi/post/01.jpg",
      Title: "Creating Responsive Web Pages"
    },
    {
      id: 5,
      Category: "Tailoring",
      Name: "Sewing Custom Suits for Men",
      Description: "Students received hands-on training on sewing custom-made suits for men, with strong emphasis on accurate measurements, pattern drafting, and fabric selection. The course explored different suit styles, fitting techniques, and finishing details. Learners also gained practical knowledge on tailoring suits to meet individual customer preferences and professional standards.",
      Date: "Today",
      Image: "danladiNasidi/post/img_1.png",
      Title: "Sewing Custom Suits for Men"
    },]

}
