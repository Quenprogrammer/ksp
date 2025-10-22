import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

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
  loading = false;
  message = '';

  constructor(private firestore: Firestore) {}

  async submitForm() {
    if (!this.bankName) {
      this.message = '❌ Bank name is required!';
      return;
    }

    this.loading = true;
    try {
      // Save bank info in Firestore (no logo upload)
      const bankCollection = collection(this.firestore, 'Banks');
      await addDoc(bankCollection, {
        name: this.bankName,
        website: this.bankWebsite,
        country: this.bankCountry,
        swiftCode: this.bankSwift,
        createdOn: new Date()
      });

      this.message = '✅ Bank added successfully';
      this.bankName = this.bankWebsite = this.bankCountry = this.bankSwift = '';
    } catch (err) {
      console.error(err);
      this.message = '❌ Error adding bank';
    } finally {
      this.loading = false;
    }
  }
}
