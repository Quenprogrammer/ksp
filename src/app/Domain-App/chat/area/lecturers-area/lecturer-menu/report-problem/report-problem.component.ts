import { Component, signal } from '@angular/core';
import { Modal } from "./modal";
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-report-problem',
  standalone: true,
  imports: [
    Modal,
    FormsModule,
    NgIf,
    RouterLink,

  ],
  templateUrl: './report-problem.component.html',
  styleUrl: './report-problem.component.scss'
})
export class ReportProblemComponent {
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

  constructor(private firestore: Firestore, private storage: Storage) {}

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
      // Upload file if selected
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
