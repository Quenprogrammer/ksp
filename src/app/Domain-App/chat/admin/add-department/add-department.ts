import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addDoc, collection, doc, setDoc, Firestore } from '@angular/fire/firestore';
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
    if (this.departmentForm.valid) {
      try {
        // 🔑 Generate collection name (remove spaces)
        const deptName = this.departmentForm.value.departmentName;
        const collectionName = deptName.replace(/\s+/g, '_');

        const departmentData = {
          ...this.departmentForm.value,
          collectionName, // ✅ add the safe collection name here
          createdAt: new Date()
        };

        // 1️⃣ Save in "departmentsData"
        const collRef = collection(this.firestore, 'departmentsData');
        await addDoc(collRef, departmentData);

        // 2️⃣ Create collection with the department's collectionName and a "profile" doc
        const profileDocRef = doc(this.firestore, collectionName, 'profile');
        await setDoc(profileDocRef, departmentData);

        console.log('✅ Department added and profile created!');
        alert('Department saved successfully!');

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
      } catch (err) {
        console.error('❌ Error saving department:', err);
        alert('Error saving department. Check console for details.');
      }
    } else {
      console.log('⚠️ Form is invalid!');
      alert('Please fill all required fields correctly.');
    }
  }
}
