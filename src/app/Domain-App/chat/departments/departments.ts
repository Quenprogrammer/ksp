import { Component } from '@angular/core';
import { HeaderPoly } from '../request/header-poly/header-poly';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';

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
  selector: 'app-departments',
  imports: [HeaderPoly, FormsModule, AsyncPipe, NgForOf, NgIf, DatePipe],
  templateUrl: './departments.html',
  styleUrls: ['./departments.scss'],
  standalone: true,
})
export class Departments {
  departments: Department[] = [];
  filteredDepartments: Department[] = [];
  searchTerm: string = '';

  // Modal
  showModal = false;
  selectedDept: Department | null = null;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const deptRef = collection(this.firestore, 'departmentsData');
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
      await deleteDoc(doc(this.firestore, 'departmentsData', id));
      alert('Department deleted successfully.');
    }
  }

  async disableDepartment(id: string | undefined) {
    if (!id) return;
    const deptDoc = doc(this.firestore, 'departmentsData', id);
    await updateDoc(deptDoc, { disabled: true });
    alert('Department disabled successfully.');
  }

  async updateDepartment(id: string | undefined) {
    if (!id) return;
    const newDesc = prompt('Enter new description:');
    if (newDesc) {
      const deptDoc = doc(this.firestore, 'departmentsData', id);
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
