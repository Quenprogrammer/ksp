import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, doc, setDoc, collection } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-department.html',
  styleUrls: ['./add-department.scss']
})
export class AddDepartment {
  departmentForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.departmentForm = this.fb.group({
      departmentName: ['', Validators.required],
      departmentCode: ['', Validators.required],
      faculty: ['', Validators.required],
      headOfDepartment: ['', Validators.required],
      establishedYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      description: [''],
      contactEmail: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      website: [''],
      logo: [null]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.departmentForm.patchValue({ logo: file.name });
    }
  }

  async onSubmit() {
    if (!this.departmentForm.valid) {
      alert('⚠️ Please fill all required fields correctly.');
      return;
    }

    try {
      const deptNameRaw = this.departmentForm.value.departmentName;
      const docId = deptNameRaw.replace(/\s+/g, '_'); // e.g. "Computer Science" → "Computer_Science"

      const departmentData = {
        ...this.departmentForm.value,
        docId,
        createdAt: new Date().toISOString(),
        location: `departments/${docId}` // full path of the main document
      };

      // ✅ 1. Save under departments/{docId}
      const deptDocRef = doc(this.firestore, 'departments', docId);
      await setDoc(deptDocRef, departmentData);

      // ✅ 2. Save a copy in DEPARTMENTS_COLLECTION
      const copyRef = doc(this.firestore, 'DEPARTMENTS_COLLECTION', docId);
      await setDoc(copyRef, { ...departmentData, location: `DEPARTMENTS_COLLECTION/${docId}` });

      // ✅ 3. Create subcollections inside the department document
      const subcollections = ['STUDENTS', 'MESSAGES', 'NOTIFICATIONS', 'LECTURERS', 'DEPARTMENTPOSTS'];
      for (const sub of subcollections) {
        const subRef = doc(collection(this.firestore, `departments/${docId}/${sub}`), 'init');
        await setDoc(subRef, { initialized: true, createdAt: new Date().toISOString() });
      }

      console.log(`✅ Department "${docId}" added successfully with subcollections.`);
      alert(`✅ Department "${deptNameRaw}" created successfully!`);

      this.departmentForm.reset({
        departmentName: '',
        departmentCode: '',
        faculty: '',
        headOfDepartment: '',
        establishedYear: '',
        description: '',
        contactEmail: '',
        phone: '',
        website: '',
        logo: null
      });

    } catch (error) {
      console.error('❌ Error saving department:', error);
      alert('⚠️ Error saving department. Please check console for details.');
    }
  }



}
