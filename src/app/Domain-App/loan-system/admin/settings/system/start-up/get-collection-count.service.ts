import { Injectable } from '@angular/core';
import {collection, Firestore, getCountFromServer} from '@angular/fire/firestore';
import {forkJoin, from, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCollectionCountService {

  constructor(private firestore: Firestore) {}

  getDocumentCount(collectionName: string): Observable<{ name: string, count: number,  }> {
    const colRef = collection(this.firestore, collectionName);
    return from(getCountFromServer(colRef)).pipe(
      map(snapshot => ({
        name: collectionName,
        count: snapshot.data().count
      })),
      // catchError fallback if needed
    );
  }

  getCountsForCollections(collectionNames: string[]): Observable<{ name: string, count: number }[]> {
    const observables = collectionNames.map(name =>
      this.getDocumentCount(name).pipe(
        // fallback in case of error
        // catchError(() => of({ name, count: -1 }))
      )
    );
    return forkJoin(observables); // waits for all to complete
  }
}
