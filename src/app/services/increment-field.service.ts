import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  doc,
  updateDoc,
  increment,
  DocumentReference
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class IncrementFieldService {
  private firestore = inject(Firestore);

  /**
   * Increment a default field (e.g., 'views') in a document
   * @param amount Number to increment by (e.g. +1, +2)
   * @param collectionName Name of Firestore collection
   * @param documentId Document ID
   */
  async increment(amount: number, collectionName: string, documentId: string): Promise<void> {
    const fieldName = 'views'; // 🔧 default field to increment
    const docRef: DocumentReference = doc(this.firestore, `${collectionName}/${documentId}`);

    try {
      await updateDoc(docRef, {
        [fieldName]: increment(amount)
      });
      console.log(`Incremented ${fieldName} by ${amount} in ${collectionName}/${documentId}`);
    } catch (error) {
      console.error('Increment failed:', error);
    }
  }
}

/*

constructor(private incrementService: IncrementFieldService) {}

incrementExample(): void {
  this.incrementService.increment(2, 'properties', 'abc123'); // ✅ Simple usage
}*/
