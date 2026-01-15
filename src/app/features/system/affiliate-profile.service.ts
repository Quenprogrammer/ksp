import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class AffiliateProfileService {
  private collection = 'affiliateProfiles';

  constructor(private firestore: Firestore, private storage: Storage) {}

  /** Save a single field on blur */
  async saveField(docId: string, field: string, value: any) {
    const docRef = doc(this.firestore, this.collection, docId);
    await setDoc(docRef, { [field]: value, updatedAt: new Date() }, { merge: true });
    console.log(`✅ Field "${field}" updated successfully`);
  }

  /** Save full profile */
  async saveProfile(docId: string, data: any) {
    const docRef = doc(this.firestore, this.collection, docId);
    await setDoc(docRef, { ...data, updatedAt: new Date() }, { merge: true });
    console.log('✅ Full profile saved successfully');
  }

  /** Auto update profile on field change */
  async autoUpdateProfile(docId: string, changes: any) {
    const docRef = doc(this.firestore, this.collection, docId);
    await setDoc(docRef, { ...changes, updatedAt: new Date() }, { merge: true });
    console.log('⚡ Auto-updated profile changes:', changes);
  }

  /** Upload and save profile image */
  async uploadProfileImage(docId: string, file: File): Promise<string> {
    const filePath = `${this.collection}/${docId}/profile_${Date.now()}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    const docRef = doc(this.firestore, this.collection, docId);
    await setDoc(docRef, { profileImage: downloadURL, updatedAt: new Date() }, { merge: true });
    console.log('✅ Profile image uploaded and saved');
    return downloadURL;
  }

  /** Fetch profile for pre-filling form */
  async getProfile(docId: string): Promise<any | null> {
    const docRef = doc(this.firestore, this.collection, docId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      console.log('📄 Loaded profile:', snap.data());
      return snap.data();
    } else {
      console.log('⚠️ No profile found for', docId);
      return null;
    }
  }
}
