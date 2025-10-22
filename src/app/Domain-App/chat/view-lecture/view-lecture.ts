
import {HeaderPoly} from '../request/header-poly/header-poly';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {NgClass, NgFor, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
}
@Component({
  selector: 'app-view-lecture',
  imports: [
    HeaderPoly,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './view-lecture.html',
  styleUrl: './view-lecture.css'
})
export class ViewLecture {
  lecturers$: Observable<any[]> | undefined;
  allLecturers: any[] = [];
  searchText: string = '';

  // For edit
  selectedLecturer: Lecturer | null = null;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const lecturersRef = collection(this.firestore, 'lecturers');
    this.lecturers$ = collectionData(lecturersRef, { idField: 'id' });
    this.lecturers$.subscribe(data => {
      this.allLecturers = data;
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
      (modal as any).style.display = 'block'; // simple show modal
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

  get filteredLecturers(): any[] {
    if (!this.searchText) {
      return this.allLecturers;
    }
    const term = this.searchText.toLowerCase();
    return this.allLecturers.filter(l =>
      l.fullName?.toLowerCase().includes(term) ||
      l.email?.toLowerCase().includes(term) ||
      l.department?.toLowerCase().includes(term) ||
      l.phone?.toLowerCase().includes(term) ||
      l.specialization?.toLowerCase().includes(term)
    );
  }
}
