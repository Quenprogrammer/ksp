import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  private vendorDoc(vendorId: string) {
    console.log(`📄 Building Firestore doc ref for vendorId: ${vendorId}`);
    return doc(this.firestore, `VENDORS/${vendorId}`);
  }

  async saveProfile(profileData: any) {
    console.log('📝 saveProfile() called with data:', profileData);

    const user = this.auth.currentUser;
    if (!user) {
      console.error('❌ No user logged in, aborting save');
      throw new Error('User not logged in');
    }

    console.log(`👤 Current user ID: ${user.uid}`);
    const ref = this.vendorDoc(user.uid);

    console.log('⏳ Writing data to Firestore...');
    await setDoc(
      ref,
      {
        ...profileData,
        updatedAt: new Date(),
      },
      { merge: true } // merge = update if exists
    );

    console.log('✅ Profile data saved/updated successfully in Firestore');
  }

  async getProfile() {
    console.log('📥 getProfile() called');

    const user = this.auth.currentUser;
    if (!user) {
      console.error('❌ No user logged in, aborting fetch');
      throw new Error('User not logged in');
    }

    console.log(`👤 Current user ID: ${user.uid}`);
    const ref = this.vendorDoc(user.uid);

    console.log('⏳ Fetching profile data from Firestore...');
    const snap = await getDoc(ref);

    if (snap.exists()) {
      console.log('✅ Profile data found:', snap.data());
      return snap.data();
    } else {
      console.warn('⚠️ No profile document found for this user');
      return null;
    }
  }
}
