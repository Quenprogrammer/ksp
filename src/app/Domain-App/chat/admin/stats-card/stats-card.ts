import {Component, Input, signal, SimpleChanges} from '@angular/core';
import {collection, Firestore, getCountFromServer} from '@angular/fire/firestore';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-stats-card',
  imports: [
    NgIf
  ],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss'
})
export class StatsCard {
  @Input() text: string = 'NULL';
  @Input() value: number = 0;
  @Input() icon: string = 'chatIcons/poly/poly.png';

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
