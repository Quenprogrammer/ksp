
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {HeaderPoly} from '../../request/header-poly/header-poly';

@Component({
  selector: 'app-messages-logs',
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    AsyncPipe,
    DatePipe,
    HeaderPoly
  ],
  templateUrl: './messages-logs.html',
  styleUrl: './messages-logs.css'
})
export class MessagesLogs {
  attempts$!: Observable<any[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const attemptsRef = collection(this.firestore, 'messageAttempts');
    this.attempts$ = collectionData(attemptsRef, { idField: 'id' }) as Observable<any[]>;
  }

  async deleteAttempt(id: string) {
    if (confirm('Are you sure you want to delete this attempt?')) {
      const attemptDoc = doc(this.firestore, `messageAttempts/${id}`);
      await deleteDoc(attemptDoc);
      console.log(`🗑️ Deleted attempt with id: ${id}`);
    }
  }
}
