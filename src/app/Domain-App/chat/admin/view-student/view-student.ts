import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgForOf, AsyncPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ChatHeader} from '../../chat-header/chat-header';
import {HeaderPoly} from '../../request/header-poly/header-poly';

interface Student {
  id?: string;
  name: string;
  email: string;
  gender: string;
  department: string;
  course: string;
  state: string;
  level: string;
  phone: string;
  lga: string;
}

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [NgForOf, AsyncPipe, FormsModule, NgIf, ChatHeader, HeaderPoly],
  templateUrl: './view-student.html',
  styleUrl: './view-student.scss'
})
export class ViewStudent implements OnInit {
  students$!: Observable<Student[]>;

  // Totals
  totalStudents: number = 0;
  totalMale: number = 0;
  totalFemale: number = 0;
  totalDepartments: number = 0;

  editingStudent: string | null = null;
  updatedData: Partial<Student> = {};

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const studentsCol = collection(this.firestore, 'STUDENTS_COLLECTION');
    this.students$ = collectionData(studentsCol, { idField: 'id' }) as Observable<Student[]>;

    this.students$.subscribe(students => {
      this.totalStudents = students.length;
      this.totalMale = students.filter(s => s.gender === 'Male').length;
      this.totalFemale = students.filter(s => s.gender === 'Female').length;

      // Count unique departments
      const deptSet = new Set(students.map(s => s.department));
      this.totalDepartments = deptSet.size;
    });
  }

  // Edit student
  editStudent(student: Student) {
    this.editingStudent = student.id ?? null;
    this.updatedData = { ...student };
  }

  cancelEdit() {
    this.editingStudent = null;
    this.updatedData = {};
  }

  async updateStudent(id: string) {
    if (!id) return;
    const studentRef = doc(this.firestore, `students/${id}`);
    await updateDoc(studentRef, this.updatedData);
    this.editingStudent = null;
    alert('Student updated successfully!');
  }

  async deleteStudent(id: string | undefined) {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this student?')) return;

    const studentRef = doc(this.firestore, `students/${id}`);
    await deleteDoc(studentRef);

    alert('Student deleted successfully!');
  }

}
