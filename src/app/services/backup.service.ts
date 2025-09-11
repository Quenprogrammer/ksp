import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {collection, Firestore, getDocs} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  private collections = [
    'AGENTS', 'cities', 'COURSES', 'CURRENCY', 'PROPERTIES'
  ];

  constructor(private firestore: Firestore) {}

  async exportCollections() {
    const data: { [key: string]: any[] } = {};

    for (const collectionName of this.collections) {
      const colRef = collection(this.firestore, collectionName);
      const snapshot = await getDocs(colRef);
      data[collectionName] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    this.downloadJsonFile(data, 'firestore-data.json');
  }

  private downloadJsonFile(data: any, filename: string) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
