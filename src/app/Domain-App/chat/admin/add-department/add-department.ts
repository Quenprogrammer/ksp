import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {addDoc} from '@angular/fire/firestore';
import {collection, Firestore} from 'firebase/firestore';

@Component({
  selector: 'app-add-department',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-department.html',
  styleUrl: './add-department.scss'
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
      logo: [null] // ⚠️ for now we’ll just store the filename/base64, not upload to Storage
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // For now, store only the filename (upload to Firebase Storage can be added later)
      this.departmentForm.patchValue({ logo: file.name });
    }
  }

  async onSubmit() {
    if (this.departmentForm.valid) {
      try {
        const collRef = collection(this.firestore, 'departments');
        await addDoc(collRef, {
          ...this.departmentForm.value,
          createdAt: new Date()
        });

        console.log('✅ Department added to Firestore!');
        alert('Department saved successfully!');
        this.departmentForm.reset();
      } catch (err) {
        console.error('❌ Error saving department:', err);
      }
    } else {
      console.log('⚠️ Form is invalid!');
    }
  }}
