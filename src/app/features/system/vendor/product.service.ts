import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { UserContextService } from '../auth/user-context.service';

export interface Product {
  id?: string;
  productID: string;
  name: string;
  basePrice: number;
  description: string;
  collection: string;
  brand: string;
  categories: string[];
  tags: string[];
  images: string[];
  customFields: { key: string; value: string }[];
  specifications: { key: string; value: string }[];
  video: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private firestore = inject(Firestore);
  private userContext = inject(UserContextService);

  get vendorId() {
    return this.userContext.vendor();
  }

  loadProducts(): Observable<Product[]> {
    const ref = collection(this.firestore, `vendors/${this.vendorId}/products`);
    return collectionData(ref, { idField: 'id' }) as Observable<Product[]>;
  }

  async deleteProduct(productId: string): Promise<void> {
    if (!productId) return;
    const productDoc = doc(this.firestore, `vendors/${this.vendorId}/products`, productId);
    await deleteDoc(productDoc);
  }

  filterProducts(products: Product[], query: string): Product[] {
    const q = query.toLowerCase().trim();
    if (!q) return products;

    return products.filter((product) => {
      const basePriceStr = product.basePrice?.toString() || '';
      return (
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.collection?.toLowerCase().includes(q) ||
        product.categories?.some((cat) => cat.toLowerCase().includes(q)) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(q)) ||
        basePriceStr.includes(q)
      );
    });
  }
}
