import { Component } from '@angular/core';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {HeaderPoly} from '../../Domain-App/chat/request/header-poly/header-poly';
import {Observable} from 'rxjs';
import {collection, collectionData, deleteDoc, doc, Firestore} from '@angular/fire/firestore';
import {AddStudent} from '../../Domain-App/chat/admin/add-student/add-student';

@Component({
  selector: 'app-messsage-logs',
  imports: [
    AsyncPipe,
    DatePipe,
    HeaderPoly,
    NgForOf,
    NgIf,
    NgClass,
    AddStudent
  ],
  templateUrl: './messsage-logs.html',
  styleUrl: './messsage-logs.css'
})
export class FCAPMesssageLogs {
  attempts$!: Observable<any[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const attemptsRef = collection(this.firestore, 'FCAP_MESSAGE_LOG');
    this.attempts$ = collectionData(attemptsRef, { idField: 'id' }) as Observable<any[]>;
  }

  async deleteAttempt(id: string) {
    if (confirm('Are you sure you want to delete this attempt?')) {
      const attemptDoc = doc(this.firestore, `FCAP_MESSAGE_LOG/${id}`);
      await deleteDoc(attemptDoc);
      console.log(`🗑️ Deleted attempt with id: ${id}`);
    }
  }
}
