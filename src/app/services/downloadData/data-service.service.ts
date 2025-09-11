import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  constructor(private firestore: Firestore) {}

  // Add a new document to a collection
  addData(collectionName: string, data: any): Promise<any> {
    const ref = collection(this.firestore, collectionName);
    return addDoc(ref, data);
  }

  // Get all documents from a collection as an observable
  getData(collectionName: string): Observable<any[]> {
    const ref = collection(this.firestore, collectionName);
    return collectionData(ref, { idField: 'id' });
  }

  // Get a single document by its ID
  getDoc(collectionName: string, docId: string): Observable<any> {
    const ref = doc(this.firestore, `${collectionName}/${docId}`);
    return docData(ref, { idField: 'id' });
  }

  // Update a document by its ID
  updateDoc(collectionName: string, docId: string, newData: any): Promise<void> {
    const ref = doc(this.firestore, `${collectionName}/${docId}`);
    return updateDoc(ref, newData);
  }

  // Delete a document by its ID
  deleteDoc(collectionName: string, docId: string): Promise<void> {
    const ref = doc(this.firestore, `${collectionName}/${docId}`);
    return deleteDoc(ref);
  }
}
