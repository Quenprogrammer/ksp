import { Component, Input, OnInit, signal, effect } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-doc-counter',
  standalone: true,
  imports: [FormsModule, NgIf, NgStyle],
  template: `
    {{ count() }}
  `,
})
export class DocCounterComponent implements OnInit {
  @Input({ required: true }) collectionPath!: string; // ✅ Receive dynamic path  @Input() heroImage = '';


  count = signal<number | null>(null);
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');
  textStyle = signal<Record<string, string>>({
    color: 'black',
    'font-size': '13px',
    'font-family': 'Arial, sans-serif',
    'font-weight': 'bold',
  });

  constructor(private firestore: Firestore) {
    // Auto log when count changes
    effect(() => {
      const val = this.count();
      if (val !== null) console.log(`✅ Firestore document count: ${val}`);
    });
  }

  async ngOnInit() {
    await this.countDocuments();
  }

  async countDocuments() {
    this.count.set(null);
    this.errorMessage.set('');
    this.loading.set(true);

    try {
      const path = this.collectionPath.trim();
      if (!path) {
        this.errorMessage.set('Please enter a valid Firestore collection path.');
        this.loading.set(false);
        return;
      }

      const colRef = collection(this.firestore, path);
      const snapshot = await getDocs(colRef);

      this.count.set(snapshot.size);
    } catch (error: any) {
      console.error('Error counting documents:', error);
      this.errorMessage.set(
        'Failed to count documents. Check your path or Firestore rules.'
      );
    } finally {
      this.loading.set(false);
    }
  }}
