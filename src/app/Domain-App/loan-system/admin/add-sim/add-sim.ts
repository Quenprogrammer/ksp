import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

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
  loading = false;
  message = '';

  constructor(private firestore: Firestore) {}

  async submitForm() {
    if (!this.simProvider) {
      this.message = '❌ SIM provider name is required!';
      return;
    }

    this.loading = true;
    try {
      // Save SIM info in Firestore (no logo upload)
      const simCollection = collection(this.firestore, 'SimCards');
      await addDoc(simCollection, {
        provider: this.simProvider,
        country: this.simCountry,
        networkType: this.simNetworkType,
        simCode: this.simCode,
        createdOn: new Date()
      });

      this.message = '✅ SIM Card added successfully';
      this.simProvider = this.simCountry = this.simNetworkType = this.simCode = '';
    } catch (err) {
      console.error(err);
      this.message = '❌ Error adding SIM Card';
    } finally {
      this.loading = false;
    }
  }
}
