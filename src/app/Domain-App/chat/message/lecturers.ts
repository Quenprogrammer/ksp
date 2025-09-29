
import {HeaderPoly} from '../request/header-poly/header-poly';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {NgClass, NgFor, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-lecturers',
  imports: [
    HeaderPoly,
    FormsModule,
    NgClass,
    NgForOf,
    NgIf
  ],
  template: `
<app-header-poly></app-header-poly>
<div class="content-space-3">
  <div class="card">
    <!-- Header -->
    <div class="card-header card-header-content-md-between">
      <div class="mb-2 mb-md-0">
        <!-- Search -->
        <div class="input-group input-group-merge input-group-flush">
          <div class="input-group-prepend input-group-text">
            <i class="bi-search"></i>
          </div>
          <input [(ngModel)]="searchText"
                 type="search"
                 class="form-control"
                 placeholder="Search lecturers"
                 aria-label="Search lecturers">
        </div>
        <!-- End Search -->
      </div>
    </div>
    <!-- End Header -->

    <!-- Table -->
    <div class="table-responsive datatable-custom position-relative">
      <table class="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
        <thead class="thead-light">
        <tr>
          <th class="table-column-pe-0">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" (change)="toggleAll($event)">
              <label class="form-check-label"></label>
            </div>
          </th>
          <th class="table-column-ps-0">Name</th>
          <th>Department</th>
          <th>Phone</th>
          <th>Qualification</th>
          <th>Specialization</th>
          <th>Status</th>
          <th></th>
        </tr>
        </thead>

        <tbody>
        <tr *ngFor="let lecturer of filteredLecturers">
          <td class="table-column-pe-0">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" [(ngModel)]="lecturer.selected">
            </div>
          </td>

          <td class="table-column-ps-0">
            <div class="d-flex align-items-center">
              <div class="avatar avatar-circle">
                <img class="avatar-img" [src]="lecturer.photo" alt="photo">
              </div>
              <div class="ms-3">
                <span class="d-block h5 text-inherit mb-0">{{ lecturer.fullName }}</span>
                <span class="d-block fs-5 text-body">{{ lecturer.email }}</span>
              </div>
            </div>
          </td>

          <td><span class="d-block h5 mb-0">{{ lecturer.department }}</span></td>
          <td>{{ lecturer.phone }}</td>
          <td>{{ lecturer.qualification }}</td>
          <td>{{ lecturer.specialization }}</td>
          <td>
            <span class="badge" [ngClass]="lecturer.disabled ? 'bg-danger' : 'bg-success'">
              {{ lecturer.disabled ? 'Disabled' : 'Active' }}
            </span>
          </td>
          <td>
            <button class="btn btn-white btn-sm me-1" (click)="selectLecturer(lecturer)">
              <i class="bi-pencil-fill me-1"></i>Edit
            </button>
            <button class="btn btn-sm btn-warning me-1"
                    (click)="disableLecturer(lecturer.id!, !lecturer.disabled)">
              {{ lecturer.disabled ? 'Enable' : 'Disable' }}
            </button>
            <button class="btn btn-sm btn-danger" (click)="deleteLecturer(lecturer.id!)">
              <i class="bi-trash me-1"></i>Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- End Table -->
  </div>

</div>
<!-- Edit Modal -->
<div id="editModal" class="modal" tabindex="-1" style="display:none; background:rgba(0,0,0,0.6);">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Lecturer</h5>
        <button type="button" class="btn-close" (click)="closeModal()"></button>
      </div>
      <div class="modal-body" *ngIf="selectedLecturer">
        <div class="mb-3">
          <label class="form-label">Full Name</label>
          <input [(ngModel)]="selectedLecturer.fullName" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input [(ngModel)]="selectedLecturer.email" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Phone</label>
          <input [(ngModel)]="selectedLecturer.phone" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Department</label>
          <input [(ngModel)]="selectedLecturer.department" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Qualification</label>
          <input [(ngModel)]="selectedLecturer.qualification" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Specialization</label>
          <input [(ngModel)]="selectedLecturer.specialization" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Photo URL</label>
          <input [(ngModel)]="selectedLecturer.photo" class="form-control">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" (click)="closeModal()">Cancel</button>
        <button class="btn btn-primary" (click)="saveLecturer()">Save</button>
      </div>
    </div>
  </div>
</div>

  `
})
export class Lecturers {
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
