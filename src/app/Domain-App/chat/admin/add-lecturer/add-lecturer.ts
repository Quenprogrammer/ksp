import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-lecturer',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './add-lecturer.html',
  styleUrl: './add-lecturer.scss'
})
export class AddLecturer {
  lecturerForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.lecturerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      qualification: ['', Validators.required],
      specialization: ['', Validators.required],
      photo: [null, Validators.required] // you can later upload this to Firebase Storage
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.lecturerForm.patchValue({ photo: file.name }); // save filename for now
    }
  }

  async onSubmit() {
    if (this.lecturerForm.valid) {
      try {
        const lecturersRef = collection(this.firestore, 'lecturers');
        await addDoc(lecturersRef, this.lecturerForm.value);
        console.log('Lecturer Uploaded:', this.lecturerForm.value);
        alert('Lecturer added successfully!');
        this.lecturerForm.reset();
      } catch (error) {
        console.error('Error adding lecturer:', error);
      }
    } else {
      console.log('Form Invalid');
    }
  }
}
