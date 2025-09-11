import {Component, computed, inject, input, output} from '@angular/core';


import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import {AuthService} from './auth-service';


@Component({
  selector: 'app-login',
  imports: [

    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  class='display2';
  username = '';
  password = '';

  constructor(private firestore: Firestore, private router: Router) {}

/*
  async login() {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef,
        where('username', '==', this.username),
        where('password', '==', this.password)
      );
      const userSnap = await getDocs(q);

      if (userSnap.empty) {
        alert('Invalid username or password');
        return this.router.navigate(['/invalid']);
      }

      const userData = userSnap.docs[0].data() as any;
      const accessType = userData.typeofaccess?.toLowerCase();
      const userId = userSnap.docs[0].id;

      if (!['hod', 'levelcod', 'projectcod', 'student'].includes(accessType)) {
        alert('Access type is invalid.');
        return this.router.navigate(['/invalid']);
      }

      const roleRef = doc(this.firestore, `${accessType}/${userId}`);
      const roleSnap = await getDoc(roleRef);

      if (!roleSnap.exists()) {
        alert(`No record found in ${accessType} collection.`);
        return this.router.navigate(['/invalid']);
      }

      const routes: any = {
        hod: '/hoddashboard',
        levelcod: '/levelcoddashboard',
        projectcod: '/projectcoddashboard',
        student: '/studentdashboard'
      };

      return this.router.navigate([routes[accessType]]);

    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Try again.');
      return this.router.navigate(['/invalid']);
    }
  }


*/

  private readonly auth = inject(AuthService);

  // View model from signals (keeps template simple)
  async onGoogle(): Promise<void> {
    await this.auth.signInWithGoogle();
  }
}
