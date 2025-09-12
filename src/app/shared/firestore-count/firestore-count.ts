
import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { Firestore, collection, getCountFromServer } from '@angular/fire/firestore';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-firestore-count',
  imports: [
    NgIf
  ],
  templateUrl: './firestore-count.html',
  styleUrl: './firestore-count.css'
})
export class FirestoreCount implements OnChanges{
  @Input() collectionName!: string;

  count = signal<number | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private firestore: Firestore) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['collectionName'] && this.collectionName) {
      await this.loadCount();
    }
  }

  async loadCount() {
    try {
      this.loading.set(true);
      this.error.set(null);

      const collRef = collection(this.firestore, this.collectionName);
      const snapshot = await getCountFromServer(collRef);

      this.count.set(snapshot.data().count);
    } catch (err: any) {
      this.error.set(err.message ?? 'Error fetching count');
    } finally {
      this.loading.set(false);
    }
  }
}
