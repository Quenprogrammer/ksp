import { Component, OnInit } from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf} from '@angular/common';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-users',
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  users$!: Observable<any[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const usersRef = collection(this.firestore, 'users');
    this.users$ = collectionData(usersRef, { idField: 'id' }) as Observable<any[]>;
  }

  async deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      const userDoc = doc(this.firestore, `users/${id}`);
      await deleteDoc(userDoc);
    }
  }

  async disableUser(id: string) {
    const userDoc = doc(this.firestore, `users/${id}`);
    await updateDoc(userDoc, { disabled: true });
  }

  async sendMessage(id: string) {
    alert(`Message sent to user with ID: ${id}`);
    // you can replace with real messaging logic later
  }
}
