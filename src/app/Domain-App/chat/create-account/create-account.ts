import { Component } from '@angular/core';
import { Firestore, collection, doc, setDoc, updateDoc, getDoc, increment } from '@angular/fire/firestore';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './create-account.html',
  styleUrls: ['./create-account.css']
})
export class CreateAccount {
  departments = ['Computer Science', 'Engineering', 'Business', 'Law'];

  form: any;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    // ✅ Initialize form
    this.form = this.fb.group({
      name: ['', Validators.required],
      regNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      course: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required]
    });
  }

  async registerStudent() {
    if (this.form.invalid) return;
    const data = this.form.value;

    // 1. Save to main students collection
    const studentsCol = collection(this.firestore, 'students');
    await setDoc(doc(studentsCol, data.regNumber as string), data);

    // 2. Save to department collection
    const deptCol = collection(this.firestore, `departments/${data.department}/students`);
    await setDoc(doc(deptCol, data.regNumber as string), data);

    // 3. Save inside a collection named after regNumber
    //    (e.g. "2025-CS-001/profile")
    const profileDoc = doc(this.firestore, `${data.regNumber}/profile`);
    await setDoc(profileDoc, data);

    // 4. Update statistics
    await this.updateStatistics(data);

    alert('Student registered successfully!');
    this.form.reset();
  }

  private async updateStatistics(data: any) {
    const statsCol = collection(this.firestore, 'statistics');

    // Gender stats
    await this.incrementField(statsCol, 'genderStats', data.gender, 1);

    // Department stats
    await this.incrementField(statsCol, 'departmentStats', data.department, 1);

    // Course stats
    await this.incrementField(statsCol, 'courseStats', data.course, 1);

    // State stats
    await this.incrementField(statsCol, 'stateStats', data.state, 1);

    // LGA stats
    await this.incrementField(statsCol, 'lgaStats', data.lga, 1);
  }

  private async incrementField(colRef: any, docId: string, field: string, value: number) {
    const docRef = doc(colRef, docId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      await updateDoc(docRef, { [field]: increment(value) });
    } else {
      await setDoc(docRef, { [field]: value });
    }
  }
}
