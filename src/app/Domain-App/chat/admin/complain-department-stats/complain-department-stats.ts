import {Component, Input, OnInit} from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {NgForOf, AsyncPipe, NgClass, DatePipe, NgIf} from '@angular/common';
import {Modal} from '../../../../shared/modal';

interface Department {
  contactEmail: string;
  createdAt: string;
  departmentCode: string;
  departmentName: string;
  description: string;
  establishedYear: string;
  faculty: string;
  headOfDepartment: string;
  location: string;
  phone: string;
  website: string;
  id?: string; // Firestore doc ID
}

@Component({
  selector: 'app-complain-department-stats',
  standalone: true,
  imports: [NgForOf, AsyncPipe, NgClass, DatePipe, Modal, NgIf],
  templateUrl: './complain-department-stats.html',
  styleUrls: ['./complain-department-stats.css']
})
export class ComplainDepartmentStats implements OnInit {
  departments$!: Observable<Department[]>;
  avatarColors = ['bg-primary','bg-success','bg-warning','bg-danger','bg-info','bg-secondary','bg-dark'];
  @Input() collection: string = 'DEPARTMENTS_COLLECTION';
  // Modal state
  showModal = false;
  modalDepartment: Department | null = null;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const departmentsRef = collection(this.firestore, this.collection);
    this.departments$ = collectionData(departmentsRef, { idField: 'id' }).pipe(
      map(depts => depts as Department[])
    );
  }

  async deleteDepartment(id: string | undefined) {
    if (!id) return;
    const confirmed = confirm('Are you sure you want to delete this department?');
    if (!confirmed) return;

    const docRef = doc(this.firestore, `DEPARTMENTS_COLLECTION/${id}`);
    try {
      await deleteDoc(docRef);
      alert('Department deleted successfully!');
    } catch (error) {
      console.error('Error deleting department:', error);
      alert('Failed to delete department.');
    }
  }

  getInitials(name: string): string {
    if (!name) return '';
    const words = name.split(' ');
    const firstLetter = words[0]?.charAt(0).toUpperCase() || '';
    const secondLetter = words[1]?.charAt(0).toUpperCase() || '';
    return firstLetter + secondLetter;
  }

  getAvatarColor(index: number): string {
    return this.avatarColors[index % this.avatarColors.length];
  }

  // Open modal with department info
  viewDepartment(dept: Department) {
    this.modalDepartment = dept;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalDepartment = null;
  }
}
