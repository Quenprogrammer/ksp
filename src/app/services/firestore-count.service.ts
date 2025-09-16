import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, increment, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreCountService {
  constructor(private firestore: Firestore) {}

  async increaseCount(
    collection: string,
    docId: string,
    amount: number,
    field: string = 'count'
  ): Promise<void> {
    const docRef = doc(this.firestore, `${collection}/${docId}`);

    try {
      // Try to update existing doc
      await updateDoc(docRef, {
        [field]: increment(amount),
      });
    } catch (error: any) {
      if (error.code === 'not-found' || error.message?.includes('No document to update')) {
        // ✅ If doc doesn't exist, create it with the initial value
        await setDoc(
          docRef,
          {
            [field]: amount,
          },
          { merge: true }
        );
      } else {
        console.error('Error incrementing count:', error);
        throw error;
      }
    }
  }
}
