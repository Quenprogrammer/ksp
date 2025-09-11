import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-create-profile',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-profile.html',
  styleUrl: './create-profile.scss'
})
export class CreateProfile {
  studentForm: FormGroup;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      course: ['', Validators.required],
      level: ['', Validators.required],
      image: [null] // optional: file (store later in Firebase Storage)
    });
  }

  // Handle file change + preview
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.studentForm.patchValue({ image: file });
      this.studentForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Submit form
  async onSubmit() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;

      try {
        const studentCollection = collection(this.firestore, 'students');
        await addDoc(studentCollection, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          course: formData.course,
          level: formData.level,
          createdAt: new Date()
          // image will be uploaded separately (Firebase Storage)
        });

        console.log('✅ Student data saved to Firestore:', formData);
        alert('Student profile created successfully!');
        this.studentForm.reset();
        this.imagePreview = null;
      } catch (error) {
        console.error('❌ Error saving student data:', error);
      }
    } else {
      console.log('Form is invalid ❌');
      this.studentForm.markAllAsTouched();
    }
  }
}
