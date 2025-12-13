import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {collection, collectionData, deleteDoc, doc, Firestore, updateDoc} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
interface Department {
  id?: string;
  collectionName: string;
  contactEmail: string;
  createdAt: any;
  departmentCode: string;
  departmentName: string;
  description: string;
  establishedYear: string;
  faculty: string;
  headOfDepartment: string;
  logo: string;
  phone: string;
  website: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-dpartments',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './dpartments.html',
  styleUrl: './dpartments.css'
})
export class Dpartments {
  today = new Date();
  departments: Department[] = [];
  filteredDepartments: Department[] = [];
  searchTerm: string = '';

  // Modal
  showModal = false;
  selectedDept: Department | null = null;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const deptRef = collection(this.firestore, 'departments');
    collectionData(deptRef, { idField: 'id' })
      .pipe(map((data) => data as Department[]))
      .subscribe((res) => {
        this.departments = res;
        this.filteredDepartments = res;
      });
  }

  searchDepartments(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredDepartments = this.departments.filter(
      (dept) =>
        dept.departmentName.toLowerCase().includes(term) ||
        dept.departmentCode.toLowerCase().includes(term) ||
        dept.faculty.toLowerCase().includes(term)
    );
  }

  async deleteDepartment(id: string | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this department?')) {
      await deleteDoc(doc(this.firestore, 'departments', id));
      alert('Department deleted successfully.');
    }
  }

  async disableDepartment(id: string | undefined) {
    if (!id) return;
    const deptDoc = doc(this.firestore, 'departments', id);
    await updateDoc(deptDoc, { disabled: true });
    alert('Department disabled successfully.');
  }

  async updateDepartment(id: string | undefined) {
    if (!id) return;
    const newDesc = prompt('Enter new description:');
    if (newDesc) {
      const deptDoc = doc(this.firestore, 'departments', id);
      await updateDoc(deptDoc, { description: newDesc });
      alert('Department updated successfully.');
    }
  }

  viewDepartment(dept: Department) {
    this.selectedDept = dept;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedDept = null;
  }
}
