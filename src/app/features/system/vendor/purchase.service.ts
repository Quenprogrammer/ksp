import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Purchase {
  id?: string;
  productName: string;
  productLink: string;
  productImage: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  date: string;
  license: string;
  price: number; // NEW FIELD
}


@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private firestore = inject(Firestore);

  // 🔥 Changed path: now collection is simply "purchases"
  getPurchases(): Observable<Purchase[]> {
    const purchasesRef = collection(this.firestore, 'purchases');
    return collectionData(purchasesRef, { idField: 'id' }) as Observable<Purchase[]>;
  }

  filterPurchases(purchases: Purchase[], term: string): Purchase[] {
    const lowerTerm = term.toLowerCase().trim();
    if (!lowerTerm) return [...purchases];

    return purchases.filter((purchase) =>
      purchase.productName.toLowerCase().includes(lowerTerm) ||
      purchase.author.name.toLowerCase().includes(lowerTerm) ||
      purchase.category.toLowerCase().includes(lowerTerm) ||
      purchase.license.toLowerCase().includes(lowerTerm) ||
      purchase.date.toLowerCase().includes(lowerTerm)
    );
  }
}
