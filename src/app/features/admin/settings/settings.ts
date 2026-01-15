import {Component, signal} from '@angular/core';

import {NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Modal} from '../../system/modal';

@Component({
  selector: 'app-settings',
  imports: [
    Modal,
    NgIf,
    ReactiveFormsModule,

    FormsModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  width = '700px'
  width2 = '800px'
  height = '500px'
  height2 = '600px'
  openModal = signal(false);
  reportedModal = signal(false);

  message: string = '';
  selectedFile: File | null = null;
  loading = false;
  success = '';
  priority: string = '';   // ✅ capture priority

  constructor(   ) {}

  closeModal() {
    this.openModal.set(false);
  }

  closeReportedModal() {
    this.reportedModal.set(false);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async submitReport() {
    if (!this.message.trim() && !this.selectedFile) {
      alert('Please enter a message or attach a file');
      return;
    }

    if (!this.priority) {
      alert('Please select a priority');
      return;
    }

    this.loading = true;
    let fileUrl: string | null = null;

    try {
      /* // Upload file if selected
       if (this.selectedFile) {
         const filePath = `reports/${Date.now()}_${this.selectedFile.name}`;
         const storageRef = ref(this.storage, filePath);
         await uploadBytes(storageRef, this.selectedFile);
         fileUrl = await getDownloadURL(storageRef);
       }

       // Save report to Firestore
       const reportsRef = collection(this.firestore, 'reports');
       await addDoc(reportsRef, {
         message: this.message,
         priority: this.priority,     // ✅ Save priority
         photo: "/assets/tibet-realty/placeholder-property-card.svg",                   // ✅ Save empty photo field
         name: "TIBET REALTY ADMIN",  // ✅ Save name
         fileUrl,
         createdAt: new Date()
       });
 */
      this.success = '✅ Report submitted successfully!';
      this.message = '';
      this.priority = '';
      this.selectedFile = null;
    } catch (error) {
      console.error(error);
      alert('❌ Error submitting report');
    } finally {
      this.loading = false;
    }
  }

  protected readonly document = document;
}
