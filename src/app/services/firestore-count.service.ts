import {inject, Injectable} from '@angular/core';
import {getCountFromServer} from '@angular/fire/firestore';
import {collection, Firestore} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreCountService {

  private firestore = inject(Firestore);

  async countCollections(paths: string[]): Promise<Record<string, number>> {
    const results: Record<string, number> = {};

    const countPromises = paths.map(async (path) => {
      const colRef = collection(this.firestore, path);
      const snapshot = await getCountFromServer(colRef);
      results[path] = snapshot.data().count;
    });

    await Promise.all(countPromises);
    return results;
  }
}
