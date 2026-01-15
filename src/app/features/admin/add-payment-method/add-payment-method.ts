import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-add-payment-method',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-payment-method.html',
  styleUrl: './add-payment-method.css'
})
export class AddPaymentMethod {
  private firestore = inject(Firestore);
  private router = inject(Router);

  platformType: 'bank' | 'digital' = 'bank';

  bankData = {
    bankName: '',
    accountName: '',
    accountType: 'checking',
    accountNumber: '',
    routingNumber: '',
    swiftCode: '',
    bankAddress: '',
    isActive: true,
    notes: ''
  };

  digitalData = {
    type: '',
    platformName: '',
    username: '',
    accountName: '',
    qrCode: '',
    paymentLink: '',
    minAmount: 0,
    maxAmount: 10000,
    instantTransfer: true,
    isActive: true,
    notes: ''
  };

  isSaving = false;
  showSuccessModal = false;

  selectType(type: 'bank' | 'digital') {
    this.platformType = type;
  }

  getPlatformLabel(): string {
    switch(this.digitalData.type) {
      case 'paypal': return 'PayPal Email';
      case 'cashapp': return 'CashApp $Tag';
      case 'venmo': return 'Venmo Username';
      case 'zelle': return 'Zelle Email or Phone';
      case 'chime': return 'Chime $Tag';
      default: return 'Username/Email/Phone';
    }
  }

  getPlatformPlaceholder(): string {
    switch(this.digitalData.type) {
      case 'paypal': return 'yourname@paypal.com';
      case 'cashapp': return '$YourCashtag';
      case 'venmo': return '@YourVenmo';
      case 'zelle': return 'email@example.com or (123) 456-7890';
      case 'chime': return '$YourChimeTag';
      default: return 'Enter platform identifier';
    }
  }

  onPlatformChange() {
    if (this.digitalData.type && !this.digitalData.platformName) {
      this.digitalData.platformName = this.digitalData.type.charAt(0).toUpperCase() +
        this.digitalData.type.slice(1);
    }
  }

  async savePlatform() {
    this.isSaving = true;

    try {
      let dataToSave;
      let collectionName;

      if (this.platformType === 'bank') {
        dataToSave = {
          ...this.bankData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        collectionName = 'banks';
      } else {
        dataToSave = {
          ...this.digitalData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        collectionName = 'digitalPlatforms';
      }

      // Save to Firestore
      const collectionRef = collection(this.firestore, collectionName);
      await addDoc(collectionRef, dataToSave);

      this.showSuccessModal = true;

    } catch (error) {
      console.error('Error saving platform:', error);
      alert('Error saving platform. Please try again.');
    } finally {
      this.isSaving = false;
    }
  }

  goBack() {
    this.router.navigate(['/payment-methods']);
  }

  addAnother() {
    this.showSuccessModal = false;
    this.resetForm();
  }

  resetForm() {
    if (this.platformType === 'bank') {
      this.bankData = {
        bankName: '',
        accountName: '',
        accountType: 'checking',
        accountNumber: '',
        routingNumber: '',
        swiftCode: '',
        bankAddress: '',
        isActive: true,
        notes: ''
      };
    } else {
      this.digitalData = {
        type: '',
        platformName: '',
        username: '',
        accountName: '',
        qrCode: '',
        paymentLink: '',
        minAmount: 0,
        maxAmount: 10000,
        instantTransfer: true,
        isActive: true,
        notes: ''
      };
    }
  }
}
