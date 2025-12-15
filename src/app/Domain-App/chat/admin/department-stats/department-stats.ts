import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {AsyncPipe, DatePipe, NgForOf} from '@angular/common';
import {deleteDoc, doc} from 'firebase/firestore';

interface UniversityRequest {
  id?: string;
  title: string;
  description: string;
  createdAt: any; // Firestore timestamp
}
@Component({
  selector: 'app-department-stats',
  imports: [
    NgForOf,
    AsyncPipe,
    DatePipe

  ],
  templateUrl: './department-stats.html',
  styleUrl: './department-stats.scss'
})
export class DepartmentStats {
  requests$!: Observable<UniversityRequest[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const requestsCollection = collection(this.firestore, 'universityRequests');
    this.requests$ = collectionData(requestsCollection, { idField: 'id' }) as Observable<UniversityRequest[]>;
  }

  async deleteRequest(id: string) {
    if (confirm('Are you sure you want to delete this request?')) {
      const requestDoc = doc(this.firestore, `universityRequests/${id}`);
      await deleteDoc(requestDoc);
      alert('Request deleted successfully.');
    }
  }

}
