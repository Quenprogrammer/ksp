import { Component, signal } from '@angular/core';
import {Firestore, collection, collectionData, deleteDoc, doc, addDoc} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {HeaderPoly} from '../request/header-poly/header-poly';
import {Modal} from '../../../shared/modal';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
  department: string;
  course: string;
  location: string;
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
    NgIf,
    Modal
  ],
  templateUrl: './students-chat-view.html',
  styleUrl: './students-chat-view.css'
})
export class StudentsChatView {
  // 🔹 Signals for reactivity
  students = signal<Student[]>([]);
  filteredStudents = signal<Student[]>([]);
  searchTerm: string = '';
  messageText: string = '';
  isSubmitting = signal(false);
  // 🔹 Pagination
  currentPage = signal<number>(1);
  itemsPerPage = 5;

  constructor(private firestore: Firestore) {
    this.loadStudents();
  }

  // ✅ Load students from Firestore
  loadStudents() {
    const studentsRef = collection(this.firestore, 'STUDENTS_COLLECTION');
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

  // Signal to control modal visibility
  post = signal<boolean>(false);

// Signal to hold the selected student
  selectedStudent = signal<Student | null>(null);

// Open modal with student info
  openPost(student: Student) {
    this.selectedStudent.set(student);
    this.post.set(true);
  }

// Close modal
  closePost() {
    this.selectedStudent.set(null);
    this.post.set(false);
  }
  async sendMessage() {
    const student = this.selectedStudent();
    console.log('Selected student:', student);

    if (!student) {
      console.log('No student selected.');
      return;
    }

    if (!this.messageText.trim()) {
      console.log('Message is empty.');
      return;
    }

    this.isSubmitting.set(true);
    console.log('Submitting message...');

    try {
      // Get the student document reference
      const studentDocRef = doc(this.firestore, 'STUDENTS_COLLECTION', student.email);
      console.log('Student document reference:', studentDocRef);

      // Get the 'inbox' subcollection under the student document
      const inboxRef = collection(studentDocRef, 'inbox');
      console.log('Inbox subcollection reference:', inboxRef);

      // Add the message to the inbox subcollection
      const docRef = await addDoc(inboxRef, {
        studentId: student.id,
        name: student.name,
        registrationNumber: student.registrationNumber,
        email: student.email,
        message: this.messageText,
        sentAt: new Date()
      });
      console.log('Message added with ID:', docRef.id);

      alert('Message sent successfully!');
      this.messageText = ''; // clear textarea
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message.');
    } finally {
      this.isSubmitting.set(false);
      console.log('Submission finished.');
    }
  }

}
