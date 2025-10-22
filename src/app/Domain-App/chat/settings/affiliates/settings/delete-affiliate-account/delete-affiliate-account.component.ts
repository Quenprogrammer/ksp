import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgIf } from '@angular/common';
import { Firestore, doc, deleteDoc, collection, getDocs } from '@angular/fire/firestore';
import { Auth, deleteUser } from '@angular/fire/auth';
import {Modal} from '../../../../../../shared/modal';

@Component({
  selector: 'lh-delete-affiliate-account',
  imports: [FormsModule, Modal, NgIf],
  templateUrl: './delete-affiliate-account.component.html',
  styleUrls: ['./delete-affiliate-account.component.scss'],
})
export class DeleteAffiliateAccountComponent {
  deleteModal = false;
  confirmDelete = false;
  errorFields = false;
  confirmDeleteFinal = false;

  width2 = '400px';
  height3 = '300px';

  constructor(private firestore: Firestore, private auth: Auth) {}

  openDeleteModal() {
    if (!this.confirmDelete) {
      this.errorFields = true;
      return;
    }
    this.deleteModal = true;
  }

  closeDeleteModal() {
    this.deleteModal = false;
    this.confirmDeleteFinal = false;
  }

  closeErrorModal() {
    this.errorFields = false;
    this.confirmDeleteFinal = false;
  }

  async deleteAccount() {
    try {
      if (!this.confirmDeleteFinal) return;

      // ✅ Get current user
      const user = this.auth.currentUser;
      if (!user) {
        console.error('❌ No authenticated user found');
        return;
      }

      const uid = user.uid;
      const userDocRef = doc(this.firestore, 'affiliates', uid);

      // 🔄 Recursively delete known subcollections (example: "Recent_devices", "payments")
      const subCollections = ['Recent_devices', 'payments', 'orders']; // adjust to match your structure

      for (const subCol of subCollections) {
        const subColRef = collection(this.firestore, `affiliates/${uid}/${subCol}`);
        const snapshot = await getDocs(subColRef);
        for (const docSnap of snapshot.docs) {
          await deleteDoc(docSnap.ref);
          console.log(`🗑 Deleted ${subCol}/${docSnap.id}`);
        }
      }

      // 🗑 Delete the top-level affiliate doc
      await deleteDoc(userDocRef);
      console.log('✅ Affiliate Firestore document deleted:', uid);

      // 🗑 Delete Firebase Auth user (optional)
      await deleteUser(user);
      console.log('✅ Auth account deleted:', uid);

      // Reset state
      this.deleteModal = false;
      this.confirmDelete = false;
      this.confirmDeleteFinal = false;
    } catch (error) {
      console.error('❌ Error deleting account:', error);
    }
  }
}
