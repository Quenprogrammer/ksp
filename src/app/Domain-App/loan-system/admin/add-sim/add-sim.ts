import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-sim',
  imports: [
    FormsModule
  ],
  templateUrl: './add-sim.html',
  styleUrl: './add-sim.css'
})
export class AddSim {
  simProvider = '';
  simCountry = '';
  simNetworkType = '';
  simCode = '';
  logoFile: File | null = null;
  loading = false;
  message = '';

  constructor(private firestore: Firestore, private storage: Storage) {}

  onFileSelected(event: any) {
    this.logoFile = event.target.files[0];
  }

  async submitForm() {
    if (!this.simProvider || !this.logoFile) {
      this.message = '❌ SIM provider name and logo are required!';
      return;
    }

    this.loading = true;
    try {
      // 1. Upload logo to Firebase Storage
      const logoRef = ref(this.storage, `sim_logos/${Date.now()}_${this.logoFile.name}`);
      await uploadBytes(logoRef, this.logoFile);
      const logoUrl = await getDownloadURL(logoRef);

      // 2. Save SIM info in Firestore
      const simCollection = collection(this.firestore, 'SimCards');
      await addDoc(simCollection, {
        provider: this.simProvider,
        country: this.simCountry,
        networkType: this.simNetworkType,
        simCode: this.simCode,
        logoUrl,
        createdOn: new Date()
      });

      this.message = '✅ SIM Card uploaded successfully';
      this.simProvider = this.simCountry = this.simNetworkType = this.simCode = '';
      this.logoFile = null;
    } catch (err) {
      console.error(err);
      this.message = '❌ Error uploading SIM Card';
    } finally {
      this.loading = false;
    }
  }
}
