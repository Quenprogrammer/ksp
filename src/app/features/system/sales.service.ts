import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {UserContextService} from './auth/user-context.service';


export interface Sale {
  id?: string;
  product: string;
  image: string;
  date: string;
  timestamp: number;
  status: string;
  statusClass: string;
  tendered: string;
  earning: string;
  link: string;
}

@Injectable({ providedIn: 'root' })
export class SalesService {
  private firestore = inject(Firestore);
  private userContext = inject(UserContextService);

  constructor() {}

  private get docId(): string {
    const id = this.userContext.affiliate();
    if (!id) {
      throw new Error('docId is null — affiliate ID not set');
    }
    return id;
  }

  // Load all sales
  getSales(): Observable<Sale[]> {
    const salesRef = collection(this.firestore, `affiliates/${this.docId}/sales`);
    return collectionData(salesRef, { idField: 'id' }) as Observable<Sale[]>;
  }

  // Load a single sale by ID
  async getSaleById(id: string): Promise<Sale | null> {
    if (!id) return null;

    const saleDoc = doc(this.firestore, `affiliates/${this.docId}/sales/${id}`);
    const snap = await getDoc(saleDoc);
    return snap.exists() ? (snap.data() as Sale) : null;
  }
}
