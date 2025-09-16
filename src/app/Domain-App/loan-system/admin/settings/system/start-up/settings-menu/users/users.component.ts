import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {collection, collectionData, doc, Firestore, updateDoc} from '@angular/fire/firestore';
import {AsyncPipe, NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [
    NgClass,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users$: Observable<any[]> | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'USERS');
    this.users$ = collectionData(usersCollection, { idField: 'id' });
  }

  async toggleStatus(user: any) {
    const userDoc = doc(this.firestore, `USERS/${user.id}`);
    await updateDoc(userDoc, { enabled: !user.enabled });
  }
}
