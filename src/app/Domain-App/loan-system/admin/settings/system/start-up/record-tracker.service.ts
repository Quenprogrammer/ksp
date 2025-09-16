import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecordTrackerService {

  constructor(private firestore: Firestore) {}

  async incrementValueField(collectionName: string, docId: string, fieldName: string = 'value'): Promise<void> {
    const docRef = doc(this.firestore, collectionName, docId);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentValue = docSnap.data()[fieldName] ?? 0;
        const newValue = currentValue + 1;
        await updateDoc(docRef, { [fieldName]: newValue });
        console.log(`${fieldName} incremented to ${newValue} in ${collectionName}/${docId}`);
      } else {
        // Document does not exist, create with initial value 1
        await setDoc(docRef, { [fieldName]: 1 });
        console.log(`${collectionName}/${docId} created with ${fieldName} = 1`);
      }
    } catch (error) {
      console.error(`Error incrementing ${fieldName} in ${collectionName}/${docId}:`, error);
      throw error;
    }
  }
}
