import { Component } from '@angular/core';
import {collection, deleteDoc, doc, Firestore, getDocs} from '@angular/fire/firestore';

@Component({
  selector: 'app-restore-databasw',
  imports: [],
  templateUrl: './restore-databasw.component.html',
  styleUrl: './restore-databasw.component.css'
})
export class RestoreDatabaswComponent {

  constructor(private firestore: Firestore) {}

  async deleteMultiple() {
    const collectionsToDelete = ['USERS', 'LOGIN', 'profile']; // add more if needed

    for (const colName of collectionsToDelete) {
      const colRef = collection(this.firestore, colName);
      const snapshot = await getDocs(colRef);

      if (snapshot.empty) {
        console.log(`⚠️ Collection "${colName}" is empty`);
        continue;
      }

      const deletePromises = snapshot.docs.map(d =>
        deleteDoc(doc(this.firestore, colName, d.id))
      );

      await Promise.all(deletePromises);

      console.log(`✅ Deleted all docs in "${colName}"`);
    }

    console.log('🎉 All selected collections cleared!');
  }
}
