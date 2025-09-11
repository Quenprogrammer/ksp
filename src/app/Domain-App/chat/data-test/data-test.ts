import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-data-test',
  imports: [],
  template: `
    <button class="btn btn-primary" (click)="addTestData()">
      Add Test Data
    </button>
  `
})
export class DataTest {
  constructor(private firestore: Firestore) {}

  async addTestData() {
    try {
      // reference to "testCollection"
      const collRef = collection(this.firestore, 'testCollection');

      // add a document
      await addDoc(collRef, {
        name: 'John Doe',
        email: 'john@example.com',
        timestamp: new Date()
      });

      console.log('✅ Test document added!');
      alert('Test document added!');
    } catch (err) {
      console.error('❌ Error adding document:', err);
    }}
}
