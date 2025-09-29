import { Component, signal } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {HeaderPoly} from '../request/header-poly/header-poly';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
  department: string;
  course: string;
  level: string;
  school: string;
  gender: string;
  createdOn: any;
}

@Component({
  selector: 'app-students-chat-view',
  imports: [
    FormsModule,
    NgClass,
    DatePipe,
    NgForOf,
    HeaderPoly,
    NgIf
  ],
  templateUrl: './students-chat-view.html',
  styleUrl: './students-chat-view.css'
})
export class StudentsChatView {
  // 🔹 Signals for reactivity
  students = signal<Student[]>([]);
  filteredStudents = signal<Student[]>([]);
  searchTerm: string = '';

  // 🔹 Pagination
  currentPage = signal<number>(1);
  itemsPerPage = 5;

  constructor(private firestore: Firestore) {
    this.loadStudents();
  }

  // ✅ Load students from Firestore
  loadStudents() {
    const studentsRef = collection(this.firestore, 'students');
    collectionData(studentsRef, { idField: 'id' }).subscribe((data: any) => {
      this.students.set(data);
      this.filteredStudents.set(data);
    });
  }

  // ✅ Search filter (checks all fields)
  filterStudents() {
    const term = this.searchTerm.toLowerCase();
    if (!term) {
      this.filteredStudents.set(this.students());
      return;
    }

    this.filteredStudents.set(
      this.students().filter(student =>
        student.name?.toLowerCase().includes(term) ||
        student.email?.toLowerCase().includes(term) ||
        student.phone?.toLowerCase().includes(term) ||
        student.registrationNumber?.toLowerCase().includes(term) ||
        student.department?.toLowerCase().includes(term) ||
        student.course?.toLowerCase().includes(term) ||
        student.level?.toLowerCase().includes(term) ||
        student.school?.toLowerCase().includes(term) ||
        student.gender?.toLowerCase().includes(term)
      )
    );

    this.currentPage.set(1); // reset to first page when searching
  }

  // ✅ Get paginated results
  paginatedStudents(): Student[] {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredStudents().slice(start, end);
  }

  // ✅ Pagination helpers
  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredStudents().length / this.itemsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage.set(page);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages.length) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  // ✅ Delete student
  async deleteStudent(id: string) {
    try {
      const studentDoc = doc(this.firestore, `students/${id}`);
      await deleteDoc(studentDoc);
      console.log('Student deleted:', id);
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  }
}
