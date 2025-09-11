import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {AsyncPipe, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-inbox',
  imports: [
    DatePipe,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './inbox.html',
  styleUrl: './inbox.css'
})
export class Inbox {
  emailDocs$!: Observable<any[]>;
  selectedMail: string = '';

  constructor(private firestore: Firestore) {}

  loadCollection() {
    if (!this.selectedMail.trim()) {
      alert('Enter a valid email/collection name');
      return;
    }
    const collRef = collection(this.firestore, this.selectedMail);
    this.emailDocs$ = collectionData(collRef, { idField: 'id' }) as Observable<any[]>;
  }
}
