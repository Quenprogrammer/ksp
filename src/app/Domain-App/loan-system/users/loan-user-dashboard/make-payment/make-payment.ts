import { Component, signal } from '@angular/core';

import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Firestore, collection, doc, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import {Modal} from '../../../../../shared/modal';

@Component({
  selector: 'app-make-payment',
  imports: [
    Modal,
    FormsModule,
    NgIf
  ],
  templateUrl: './make-payment.html',
  styleUrl: './make-payment.css'
})
export class MakePayment {
  openModal = signal(false);
  requestModal = signal(false);
  width2 = '500px';
  height3 = '500px';
  activeTab: 'card' | 'paypal' = 'card';

  constructor(private firestore: Firestore, private auth: Auth) {}

  closeModal() {
    this.openModal.set(false);
  }
  cloeRequestModal() {
    this.requestModal.set(false);
  }

  setTab(tab: 'card' | 'paypal') {
    this.activeTab = tab;
  }

  // 🚀 Save Card under vendorId/paymentMethods
  async onSubmitCard(form: NgForm) {
    if (form.valid) {
      try {
        const user = this.auth.currentUser;
        if (!user) throw new Error('User not logged in');

        // Vendor document reference
        const vendorDoc = doc(this.firestore, `VENDORS/${user.uid}`);
        const paymentMethodsRef = collection(vendorDoc, 'paymentMethods');

        await addDoc(paymentMethodsRef, {
          type: 'card',
          cardNumber: form.value.cardNumber,
          cardName: form.value.cardName,
          expiration: form.value.expiration,
          cvc: form.value.cvc,
          createdAt: new Date(),
        });

        console.log('✅ Card saved to vendor subcollection:', form.value);

        form.reset();
        this.closeModal();
      } catch (error) {
        console.error('❌ Error saving card:', error);
      }
    } else {
      console.log('⚠️ Invalid Card Form');
    }
  }

  // 🚀 Save PayPal under vendorId/paymentMethods
  async onSubmitPaypal(form: NgForm) {
    if (form.valid) {
      try {
        const user = this.auth.currentUser;
        if (!user) throw new Error('User not logged in');

        const vendorDoc = doc(this.firestore, `VENDORS/${user.uid}`);
        const paymentMethodsRef = collection(vendorDoc, 'paymentMethods');

        await addDoc(paymentMethodsRef, {
          type: 'paypal',
          email: form.value.paypalEmail,
          createdAt: new Date(),
        });

        console.log('✅ PayPal saved to vendor subcollection:', form.value);

        form.reset();
        this.closeModal();
      } catch (error) {
        console.error('❌ Error saving PayPal:', error);
      }
    } else {
      console.log('⚠️ Invalid PayPal Form');
    }
  }
}
