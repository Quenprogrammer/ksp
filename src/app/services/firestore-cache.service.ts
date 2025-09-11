// firestore-cache.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, QuerySnapshot, DocumentData, CollectionReference } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirestoreCacheService {
  private memoryCache: Map<string, any[]> = new Map();

  constructor(private firestore: Firestore) {}

  async getCollection(collectionPath: string): Promise<any[]> {
    // 1. Check in-memory cache
    if (this.memoryCache.has(collectionPath)) {
      return this.memoryCache.get(collectionPath)!;
    }

    // 2. Check localStorage cache
    const localData = localStorage.getItem(`firestore-cache-${collectionPath}`);
    if (localData) {
      const parsed = JSON.parse(localData);
      this.memoryCache.set(collectionPath, parsed);
      return parsed;
    }

    // 3. Fetch from Firestore
    const ref = collection(this.firestore, collectionPath) as CollectionReference<DocumentData>;
    const snapshot: QuerySnapshot = await getDocs(ref);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Store in memory and localStorage
    this.memoryCache.set(collectionPath, docs);
    localStorage.setItem(`firestore-cache-${collectionPath}`, JSON.stringify(docs));

    return docs;
  }

  // Optional: Force refresh (e.g. pull-to-refresh or admin update)
  async refreshCollection(collectionPath: string): Promise<any[]> {
    const ref = collection(this.firestore, collectionPath) as CollectionReference<DocumentData>;
    const snapshot: QuerySnapshot = await getDocs(ref);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    this.memoryCache.set(collectionPath, docs);
    localStorage.setItem(`firestore-cache-${collectionPath}`, JSON.stringify(docs));

    return docs;
  }

  // Optional: Clear all cache (logout or manual reset)
  clearCache(collectionPath?: string) {
    if (collectionPath) {
      this.memoryCache.delete(collectionPath);
      localStorage.removeItem(`firestore-cache-${collectionPath}`);
    } else {
      this.memoryCache.clear();
      Object.keys(localStorage)
        .filter(key => key.startsWith('firestore-cache-'))
        .forEach(key => localStorage.removeItem(key));
    }
  }
}
