import {Component, inject} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  private firestore = inject(Firestore);

  banner = {
    bg: 'assets/img/home/electronics/banner/background.jpg',
    image: 'homepage/tlc-red-t.webp',
    title: 'anamunusStyles23',
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

  async addHomeData() {
    try {
      // 1️⃣ Save banner as a single document
      await setDoc(doc(this.firestore, 'home', 'banner'), {
        ...this.banner,
        updatedAt: new Date()
      });

      // 2️⃣ Save left products
      const leftRef = collection(this.firestore, 'home_products_left');
      for (const item of this.productsLeft) {
        await addDoc(leftRef, {
          ...item,
          createdAt: new Date()
        });
      }

      // 3️⃣ Save right products
      const rightRef = collection(this.firestore, 'home_products_right');
      for (const item of this.productsRight) {
        await addDoc(rightRef, {
          ...item,
          createdAt: new Date()
        });
      }

      console.log('Home banner and products added successfully');
    } catch (error) {
      console.error('Error adding home data:', error);
    }
  }

  ngOnInit() {
    this.loadHomeData();
  }

  banner$!: Observable<any>;
  productsLeft$!: Observable<any[]>;
  productsRight$!: Observable<any[]>;

  loadHomeData() {
    // 🔹 Banner (single document)
    const bannerRef = doc(this.firestore, 'home', 'banner');
    this.banner$ = docData(bannerRef);

    // 🔹 Left products (collection)
    const leftRef = collection(this.firestore, 'home_products_left');
    this.productsLeft$ = collectionData(leftRef, { idField: 'id' });

    // 🔹 Right products (collection)
    const rightRef = collection(this.firestore, 'home_products_right');
    this.productsRight$ = collectionData(rightRef, { idField: 'id' });
  }
  async deleteBanner() {
    try {
      const bannerRef = doc(this.firestore, 'home', 'banner');
      await deleteDoc(bannerRef);
      console.log('Banner deleted successfully');
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  }
  async deleteLeftProduct(id: string) {
    try {
      const productRef = doc(this.firestore, 'home_products_left', id);
      await deleteDoc(productRef);
      console.log('Left product deleted:', id);
    } catch (error) {
      console.error('Error deleting left product:', error);
    }
  }
  async deleteRightProduct(id: string) {
    try {
      const productRef = doc(this.firestore, 'home_products_right', id);
      await deleteDoc(productRef);
      console.log('Right product deleted:', id);
    } catch (error) {
      console.error('Error deleting right product:', error);
    }
  }

}
