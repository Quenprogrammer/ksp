import { Component, OnInit } from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf, NgIf} from '@angular/common';
import {Firestore, collection, collectionData, deleteDoc, doc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {FormsModule} from '@angular/forms';
import {HeaderPoly} from '../../request/header-poly/header-poly';
@Component({
  selector: 'app-departments-view',
  imports: [
    NgForOf,
    AsyncPipe,
    FormsModule,
    HeaderPoly,
    NgIf
  ],
  templateUrl: './departments-view.html',
  styleUrl: './departments-view.css'
})
export class DepartmentsView {
  departments$!: Observable<any[]>;

  totalDepartments: number = 0;
  editingDept: string | null = null;
  updatedData: any = {};

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const collRef = collection(this.firestore, 'departmentsData');
    this.departments$ = collectionData(collRef, { idField: 'id' }) as Observable<any[]>;

    this.departments$.subscribe(depts => {
      this.totalDepartments = depts.length;
    });
  }

  editDepartment(dept: any) {
    this.editingDept = dept.id;
    this.updatedData = { ...dept };
  }

  cancelEdit() {
    this.editingDept = null;
    this.updatedData = {};
  }

  async updateDepartment(id: string) {
    const docRef = doc(this.firestore, `departmentsData/${id}`);
    await updateDoc(docRef, this.updatedData);
    this.cancelEdit();
  }

  async deleteDepartment(id: string) {
    if (confirm('Are you sure you want to delete this department?')) {
      const docRef = doc(this.firestore, `departmentsData/${id}`);
      await deleteDoc(docRef);
    }
  }
}
