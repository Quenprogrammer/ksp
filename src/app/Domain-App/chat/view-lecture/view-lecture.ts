import { HeaderPoly } from '../request/header-poly/header-poly';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, updateDoc, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Modal } from '../../../shared/modal';

interface Lecturer {
  id?: string; // Firestore document ID
  fullName: string;
  email: string;
  phone: string;
  department: string;
  photo: string;
  qualification: string;
  specialization: string;
  disabled?: boolean; // to handle disable status
  selected?: boolean;
}

@Component({
  selector: 'app-view-lecture',
  standalone: true, // needed for imports
  imports: [
    HeaderPoly,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    Modal
  ],
  templateUrl: './view-lecture.html',
  styleUrls: ['./view-lecture.css']
})
export class ViewLecture implements OnInit {
  lecturers$: Observable<any[]> | undefined;
  allLecturers: Lecturer[] = [];
  searchText: string = '';

  // For edit
  selectedLecturer: Lecturer | null = null;

  // For messaging
  messageText: string = '';
  selectedMessageLecturer: Lecturer | null = null;
  submitting = false;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const lecturersRef = collection(this.firestore, 'lecturers');
    this.lecturers$ = collectionData(lecturersRef, { idField: 'id' });
    this.lecturers$.subscribe(data => {
      this.allLecturers = data as Lecturer[];
    });
  }

  toggleAll(event: any): void {
    const checked = event.target.checked;
    this.allLecturers.forEach(l => (l.selected = checked));
  }

  selectLecturer(lecturer: Lecturer): void {
    this.selectedLecturer = { ...lecturer }; // clone to avoid direct binding
    const modal = document.getElementById('editModal');
    if (modal) {
      (modal as any).style.display = 'block';
    }
  }

  closeModal(): void {
    this.selectedLecturer = null;
    const modal = document.getElementById('editModal');
    if (modal) {
      (modal as any).style.display = 'none';
    }
  }

  async saveLecturer(): Promise<void> {
    if (this.selectedLecturer?.id) {
      const lecturerDoc = doc(this.firestore, `lecturers/${this.selectedLecturer.id}`);
      await updateDoc(lecturerDoc, {
        fullName: this.selectedLecturer.fullName,
        email: this.selectedLecturer.email,
        phone: this.selectedLecturer.phone,
        department: this.selectedLecturer.department,
        photo: this.selectedLecturer.photo,
        qualification: this.selectedLecturer.qualification,
        specialization: this.selectedLecturer.specialization
      });
      console.log('Lecturer updated:', this.selectedLecturer.id);
    }
    this.closeModal();
  }

  async deleteLecturer(id: string): Promise<void> {
    const lecturerDoc = doc(this.firestore, `lecturers/${id}`);
    await deleteDoc(lecturerDoc);
    console.log('Lecturer deleted:', id);
  }

  async disableLecturer(id: string, disabled: boolean): Promise<void> {
    const lecturerDoc = doc(this.firestore, `lecturers/${id}`);
    await updateDoc(lecturerDoc, { disabled });
    console.log(`Lecturer ${disabled ? 'disabled' : 'enabled'}:`, id);
  }

  get filteredLecturers(): Lecturer[] {
    if (!this.searchText) return this.allLecturers;
    const term = this.searchText.toLowerCase();
    return this.allLecturers.filter(l =>
      l.fullName?.toLowerCase().includes(term) ||
      l.email?.toLowerCase().includes(term) ||
      l.department?.toLowerCase().includes(term) ||
      l.phone?.toLowerCase().includes(term) ||
      l.specialization?.toLowerCase().includes(term)
    );
  }

  // -------------------------------
  // Messaging functionality
  // -------------------------------
  openMessageModal(lecturer: Lecturer) {
    this.selectedMessageLecturer = lecturer;
    this.messageText = '';
  }

  closeMessageModal() {
    this.selectedMessageLecturer = null;
    this.messageText = '';
  }

  isSubmitting(): boolean {
    return this.submitting;
  }

  async sendMessage(): Promise<void> {
    if (!this.messageText || !this.selectedMessageLecturer) return;

    this.submitting = true;
    try {
      const messagesRef = collection(this.firestore, 'messages');
      await addDoc(messagesRef, {
        content: this.messageText,
        createdAt: serverTimestamp(),
        sender: 'System', // you can replace with current user
        recipientIds: [this.selectedMessageLecturer.id],
        status: 'SENT',
        device: {} // optional, can add real device info
      });
      alert('Message sent successfully!');
      this.closeMessageModal();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message!');
    } finally {
      this.submitting = false;
    }
  }
}
