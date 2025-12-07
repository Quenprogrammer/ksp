import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Firestore, getDocs} from '@angular/fire/firestore';
import {collection} from 'firebase/firestore';

@Component({
  selector: 'app-poly-doc-count',
  imports: [
    NgForOf
  ],
  templateUrl: './poly-doc-count.html',
  styleUrl: './poly-doc-count.css'
})
export class PolyDocCount {
  docCounts: { [key: string]: number } = {
    student: 0,
    LECTURERS_COLLECTION: 0,
    STUDENTS_COLLECTION: 0
  };

  loading = false;

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    this.loading = true;
    try {
      for (const collName of Object.keys(this.docCounts)) {
        const collRef = collection(this.firestore, collName);
        const snapshot = await getDocs(collRef);
        this.docCounts[collName] = snapshot.size;
      }
    } catch (error) {
      console.error('Error fetching document counts:', error);
    }
    this.loading = false;
  }
}
