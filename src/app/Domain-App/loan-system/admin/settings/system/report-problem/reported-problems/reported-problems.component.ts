import {Component, inject} from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import {Observable} from "rxjs";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {deleteDoc, doc} from "firebase/firestore";
export interface Ticket {
  createdAt: any;
  fileUrl: string | null;
  message: string;
  name: string;
  photo: string;
  priority: string;
}

@Component({
  selector: 'app-reported-problems',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './reported-problems.component.html',
  styleUrl: './reported-problems.component.scss'
})
export class ReportedProblemsComponent {
  firestore: Firestore = inject(Firestore);

  messages$: Observable<any[]> | undefined;

  ngOnInit(): void {
    const collRef = collection(this.firestore, 'reports'); // 👈 replace with your collection name
    this.messages$ = collectionData(collRef, { idField: 'id' });
  }
  priorityToStars(priority: string): number {
    switch (priority) {
      case 'Low': return 1;
      case 'Medium': return 2;
      case 'High': return 3;
      case 'Critical': return 4;
      default: return 0;
    }
  }
  async deleteMessage(id: string) {
    try {
      await deleteDoc(doc(this.firestore, 'reports', id)); // ✅ match your ngOnInit collection
      console.log('✅ Deleted:', id);
    } catch (err) {
      console.error('❌ Error deleting....:', err);
    }
  }

}
