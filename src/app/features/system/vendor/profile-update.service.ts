import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {
  constructor(private firestore: Firestore) {}

  private vendorDoc(vendorId: string) {
    return doc(this.firestore, `VENDORS/${vendorId}`);
  }

  async getProfile(vendorId: string) {
    const ref = this.vendorDoc(vendorId);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  }

  async saveProfile(vendorId: string, profileData: any) {
    const ref = this.vendorDoc(vendorId);
    await setDoc(
      ref,
      {
        ...profileData,
        updatedAt: new Date()
      },
      { merge: true }
    );
  }
}
