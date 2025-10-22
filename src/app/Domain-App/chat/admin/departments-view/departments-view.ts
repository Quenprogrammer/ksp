import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { Firestore, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HeaderPoly } from '../../request/header-poly/header-poly';

@Component({
  selector: 'app-departments-view',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    FormsModule,
    HeaderPoly,
    NgIf,
    CommonModule
  ],
  templateUrl: './departments-view.html',
  styleUrls: ['./departments-view.css']
})
export class DepartmentsView implements OnInit {
  departments$!: Observable<any[]>;
  totalDepartments: number = 0;
  editingDept: string | null = null;
  updatedData: any = {};

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const collRef = collection(this.firestore, 'departments');
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
    try {
      const docRef = doc(this.firestore, `departments/${id}`);
      await updateDoc(docRef, this.updatedData);
      alert('✅ Department updated successfully.');
      this.cancelEdit();
    } catch (error) {
      console.error('❌ Error updating department:', error);
      alert('⚠️ Failed to update department. Check console.');
    }
  }

  async deleteDepartment(id: string) {
    if (!confirm('Are you sure you want to delete this department?')) return;

    try {
      const docRef = doc(this.firestore, `departments/${id}`);
      await deleteDoc(docRef);
      alert('✅ Department deleted successfully.');
    } catch (error) {
      console.error('❌ Error deleting department:', error);
      alert('⚠️ Failed to delete department. Check console.');
    }
  }
}
