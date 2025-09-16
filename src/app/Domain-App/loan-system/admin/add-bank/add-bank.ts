import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-bank',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './add-bank.html',
  styleUrl: './add-bank.css'
})
export class AddBank {
  bankName = '';
  bankWebsite = '';
  bankCountry = '';
  bankSwift = '';
  logoFile: File | null = null;
  loading = false;
  message = '';

  constructor(private firestore: Firestore, private storage: Storage) {}

  onFileSelected(event: any) {
    this.logoFile = event.target.files[0];
  }

  async submitForm() {
    if (!this.bankName || !this.logoFile) {
      this.message = '❌ Bank name and logo are required!';
      return;
    }

    this.loading = true;
    try {
      // 1. Upload logo to Firebase Storage
      const logoRef = ref(this.storage, `bank_logos/${Date.now()}_${this.logoFile.name}`);
      await uploadBytes(logoRef, this.logoFile);
      const logoUrl = await getDownloadURL(logoRef);

      // 2. Save bank info in Firestore
      const bankCollection = collection(this.firestore, 'Banks');
      await addDoc(bankCollection, {
        name: this.bankName,
        website: this.bankWebsite,
        country: this.bankCountry,
        swiftCode: this.bankSwift,
        logoUrl,
        createdOn: new Date()
      });

      this.message = '✅ Bank uploaded successfully';
      this.bankName = this.bankWebsite = this.bankCountry = this.bankSwift = '';
      this.logoFile = null;
    } catch (err) {
      console.error(err);
      this.message = '❌ Error uploading bank';
    } finally {
      this.loading = false;
    }
  }
}
