import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from '@angular/fire/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import {
  doc,
  setDoc,
  collection,
  getDoc,
  updateDoc,
  increment,
  getFirestore,
  serverTimestamp,
} from '@angular/fire/firestore';

const provider = new GoogleAuthProvider();

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private firestore = getFirestore();

  constructor() {}

  /** 🔹 SIGNUP with role-based Firestore structure */
  async signup(
    email: string,
    password: string,
    role: 'vendor' | 'affiliate',
    displayName: string
  ): Promise<void> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = cred.user;

    await updateProfile(user, { displayName });

    // Create user profile document
    await setDoc(doc(this.firestore, 'USERS', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName,
      role,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });

    // Create vendor or affiliate Firestore structure
    if (role === 'vendor') {
      await this.createVendorStructure(user.uid, displayName);
    } else {
      await this.createAffiliateStructure(user.uid, displayName);
    }
  }

  /** 🔹 LOGIN with email and password */
  async loginWithEmailAndPassword(email: string, password: string): Promise<void> {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    const user = cred.user;

    // Update login counter if exists
    const userRef = doc(this.firestore, 'USERS', user.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      await updateDoc(userRef, {
        logins: increment(1),
        lastLogin: serverTimestamp(),
      });
    }

    return Promise.resolve();
  }

  /** 🔹 LOGIN with Google redirect */
  async signInWithGoogle(): Promise<void> {
    await signInWithRedirect(this.auth, provider);
  }

  /** 🔹 RESET PASSWORD */
  async forgotPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email, {
      url: 'https://yourapp.web.app/',
      handleCodeInApp: true,
    });
  }

  /** 🔹 LOGOUT */
  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/login']);
  }

  // =====================================
  // 🔸 Helper functions for data structure
  // =====================================

  private async createVendorStructure(vendorId: string, displayName: string) {
    const vendorRef = doc(this.firestore, `vendors/${vendorId}`);
    await setDoc(vendorRef, {
      vendorId,
      name: displayName,
      createdAt: serverTimestamp(),
    });

    const statsRef = collection(vendorRef, 'dashboardStatistics');

    await setDoc(doc(statsRef, 'earningBeforeTax'), {
      amount: 0,
      name: 'Earnings (before taxes)',
      createdOn: serverTimestamp(),
      updatedOn: serverTimestamp(),
    });

    await setDoc(doc(statsRef, 'balance'), {
      amount: 0,
      name: 'Your balance',
      paid: '15/09/2024',
    });

    await setDoc(doc(statsRef, 'earnings'), {
      amount: 0,
      name: 'Lifetime earnings',
    });

    const subcollections = [
      'favourite',
      'myReview',
      'payout',
      'profile',
      'purchases',
      'sales',
    ];

    for (const sub of subcollections) {
      const subRef = collection(vendorRef, sub);
      await setDoc(doc(subRef), { initialized: true });
    }
  }

  private async createAffiliateStructure(affiliateId: string, displayName: string) {
    const affiliateRef = doc(this.firestore, `affiliate/${affiliateId}`);
    await setDoc(affiliateRef, {
      affiliateId,
      name: displayName,
      createdAt: serverTimestamp(),
    });

    const subcollections = [
      'affiliateLinks',
      'commissionspayouts',
      'registrations',
      'sales',
      'earning',
    ];

    for (const sub of subcollections) {
      const subRef = collection(affiliateRef, sub);
      if (sub === 'earning') {
        const statsRef = doc(subRef, 'statistics');
        await setDoc(statsRef, {
          name: 'Lifetime earnings',
          amount: 156,
          basedOn: 'List price',

          balance: {
            name: 'Your balance',
            amount: 735,
            description: 'To be paid',
            date: '15/09/2024',
          },

          earningsBeforeTax: {
            name: 'Earnings (before taxes)',
            amount: 842,
            description: 'Sales',
            date: '01/09/2024 - 13/09/2024',
          },
        });
      } else {
        await setDoc(doc(subRef), { initialized: true });
      }
    }
  }
}
