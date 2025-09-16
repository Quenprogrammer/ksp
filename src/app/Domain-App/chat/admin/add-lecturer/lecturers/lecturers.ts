import { Component, OnInit } from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf, NgIf} from '@angular/common';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Lecturer {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  qualification: string;
  specialization: string;
  photo: string;
}
@Component({
  selector: 'app-lecturers',
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './lecturers.html',
  styleUrl: './lecturers.scss'
})
export class Lecturers {
  lecturers$!: Observable<any[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const lecturersRef = collection(this.firestore, 'lecturers');
    this.lecturers$ = collectionData(lecturersRef, { idField: 'id' }) as Observable<any[]>;
  }

  async deleteLecturer(id: string) {
    if (confirm('Are you sure you want to delete this lecturer?')) {
      const docRef = doc(this.firestore, `lecturers/${id}`);
      await deleteDoc(docRef);
      alert('Lecturer deleted successfully!');
    }
  }

  async disableLecturer(id: string) {
    const docRef = doc(this.firestore, `lecturers/${id}`);
    await updateDoc(docRef, { active: false });
    alert('Lecturer disabled successfully!');
  }

  async enableLecturer(id: string) {
    const docRef = doc(this.firestore, `lecturers/${id}`);
    await updateDoc(docRef, { active: true });
    alert('Lecturer enabled successfully!');
  }

  async updateLecturer(lecturer: any) {
    const newName = prompt('Enter new full name:', lecturer.fullName);
    if (newName && newName.trim() !== '') {
      const docRef = doc(this.firestore, `lecturers/${lecturer.id}`);
      await updateDoc(docRef, { fullName: newName });
      alert('Lecturer updated successfully!');
    }
  }
}
