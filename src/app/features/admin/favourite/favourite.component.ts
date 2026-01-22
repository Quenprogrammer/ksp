import { Component, inject, signal, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';

import { firstValueFrom } from 'rxjs';
import {SelectComponent} from '../../shared/select/select.component';
import {NoDocumentComponent} from '../../shared/no-document/no-document.component';
import {LoadingComponent} from '../../shared/loading/loading.component';
import {UserContextService} from '../../system/auth/user-context.service';
import {Header} from '../../shared/header/header';


// Product Interface
export interface Product {
  id?: string;
  name: string;
  link: string;
  image: string;
  price: string;
  seller: {
    name: string;
    avatar: string;
    category: string;
  };
  sales: string;
}

@Component({
  selector: 'lh-favourite',
  standalone: true,
  imports: [
    SelectComponent,
    NgForOf,
    NgIf,
    NoDocumentComponent,
    LoadingComponent,
    Header,
  ],
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
  // ✅ Inject user context
  private userContext = inject(UserContextService);

  // ✅ Reactive vendor ID (renamed from docId)
  get vendor() {
    return this.userContext.vendor(); // dynamic & reactive
  }

  // ✅ Optional: affiliate context (if you want to use it later)
  get affiliate() {
    return this.userContext.affiliate(); // dynamic & reactive
  }

  private firestore = inject(Firestore);

  // Options
  productOptions: string[] = [
    'All products',
    'Vectors',
    'Mockups',
    'Photos',
    'Templates',
  ];
  selectedProduct = this.productOptions[0];

  // Signals
  products = signal<Product[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const vendorId = this.vendor; // ✅ reactive vendor value
      if (!vendorId) {
        this.error.set('Vendor not found.');
        this.loading.set(false);
        return;
      }

      const ref = collection(this.firestore, `vendors/${vendorId}/favourite`);
      const snapshot = await firstValueFrom(collectionData(ref, { idField: 'id' }));
      this.products.set(snapshot as Product[]);
    } catch (err) {
      console.error(err);
      this.error.set('Failed to load products.');
    } finally {
      this.loading.set(false);
    }
  }

  async deleteProduct(id?: string) {
    if (!id) return;
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
      const vendorId = this.vendor;
      if (!vendorId) {
        this.error.set('Vendor not found.');
        return;
      }

      await deleteDoc(doc(this.firestore, `vendors/${vendorId}/favourite/${id}`));
      this.products.update((list) => list.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      this.error.set('Failed to delete product.');
    }
  }

  viewProduct(link: string) {
    window.open(link, '_blank');
  }
}
