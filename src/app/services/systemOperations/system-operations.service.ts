import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SystemOperationsService {
  copiedCount$ = new BehaviorSubject<number>(0);
  totalDocs$ = new BehaviorSubject<number>(0);
  progress$ = new BehaviorSubject<number>(0);
  isCopying$ = new BehaviorSubject<boolean>(false);

  constructor(private firestore: Firestore) {}

  async copyCollection(sourcePath: string, targetPath: string): Promise<void> {
    this.isCopying$.next(true);
    this.copiedCount$.next(0);
    this.totalDocs$.next(0);
    this.progress$.next(0);

    try {
      const sourceRef = collection(this.firestore, sourcePath);
      const snapshot = await getDocs(sourceRef);

      const total = snapshot.size;
      this.totalDocs$.next(total);

      let copied = 0;
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const targetRef = doc(this.firestore, targetPath, docSnap.id);
        await setDoc(targetRef, data);

        copied++;
        this.copiedCount$.next(copied);
        this.progress$.next(Math.round((copied / total) * 100));
      }

      console.log(`✅ ${copied} documents copied from "${sourcePath}" to "${targetPath}"`);
    } catch (err) {
      console.error('❌ Error copying documents:', err);
    } finally {
      this.isCopying$.next(false);
    }
  }

  async deleteSourceCollection(sourcePath: string): Promise<void> {
    try {
      const sourceRef = collection(this.firestore, sourcePath);
      const snapshot = await getDocs(sourceRef);

      const deletePromises: Promise<void>[] = [];

      snapshot.forEach(docSnap => {
        const docRef = doc(this.firestore, sourcePath, docSnap.id);
        deletePromises.push(deleteDoc(docRef));
      });

      await Promise.all(deletePromises);
      console.log(`🗑️ Deleted ${snapshot.size} documents from "${sourcePath}"`);
    } catch (err) {
      console.error('❌ Error deleting source collection:', err);
    }
  }

  async updateAllDocumentsInCollection(collectionPath: string, updateData: { [key: string]: any }): Promise<void> {
    try {
      const collectionRef = collection(this.firestore, collectionPath);
      const snapshot = await getDocs(collectionRef);

      const updatePromises: Promise<void>[] = [];

      snapshot.forEach(docSnap => {
        const docRef = doc(this.firestore, collectionPath, docSnap.id);
        updatePromises.push(setDoc(docRef, updateData, { merge: true }));
      });

      await Promise.all(updatePromises);
      console.log(`✅ Updated ${snapshot.size} documents in "${collectionPath}"`);
    } catch (error) {
      console.error('❌ Error updating documents:', error);
    }
  }

}
