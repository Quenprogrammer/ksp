import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  // login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // logout
  logout() {
    return signOut(this.auth);
  }

  // get current logged-in user
  get currentUser$() {
    return user(this.auth); // observable of firebase user
  }

  // fetch extra user details from Firestore
  getUserProfile(uid: string): Observable<any> {
    const ref = doc(this.firestore, `users/${uid}`);
    return docData(ref); // returns user document data
  }
}
