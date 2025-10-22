import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, doc, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-lecturer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-lecturer.html',
  styleUrls: ['./add-lecturer.scss']
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
      photo: ['']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.lecturerForm.patchValue({ photo: file.name }); // save filename only
    }
  }

  async onSubmit() {
    if (!this.lecturerForm.valid) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const formData = this.lecturerForm.value;
      const email = formData.email; // use email directly as doc ID

      // 🔹 Step 1: Save lecturer in main 'lecturers' collection
      const lecturerDocRef = doc(this.firestore, `lecturers/${email}`);
      await setDoc(lecturerDocRef, { ...formData, createdAt: serverTimestamp(), location: `lecturers/${email}` });

      // 🔹 Step 2: Save a copy in 'LECTURERS_COLLECTION' with location
      const copyRef = doc(this.firestore, `LECTURERS_COLLECTION/${email}`);
      await setDoc(copyRef, { ...formData, createdAt: serverTimestamp(), location: `LECTURERS_COLLECTION/${email}` });

      // 🔹 Step 3: Create required subcollections with placeholder docs
      const subcollections = ['MESSAGES', 'NOTIFICATIONS', 'LOGS', 'CONTACTS', 'PROFILE'];
      for (const sub of subcollections) {
        const subDocRef = doc(this.firestore, `lecturers/${email}/${sub}/placeholder`);
        await setDoc(subDocRef, { init: true, createdAt: serverTimestamp() });
      }

      alert('✅ Lecturer added with all subcollections and copy in LECTURERS_COLLECTION!');
      this.lecturerForm.reset();
      this.lecturerForm.get('photo')?.setValue(null);

    } catch (error) {
      console.error('❌ Error adding lecturer:', error);
      alert('Error saving lecturer. Check console.');
    }
  }
}
