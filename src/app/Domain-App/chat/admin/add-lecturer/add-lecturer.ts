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
      const email = formData.email; // use email as doc ID

      // 🔹 Save lecturer in main 'lecturers' collection
      const mainDocRef = doc(this.firestore, `lecturers/${email}`);
      await setDoc(mainDocRef, {
        ...formData,
        createdAt: serverTimestamp(),
        location: `lecturers/${email}` // save Firestore path
      });

      // 🔹 Save copy in 'LECTURERS_COLLECTION' with location field
      const copyRef = doc(this.firestore, `LECTURERS_COLLECTION/${email}`);
      await setDoc(copyRef, {
        ...formData,
        createdAt: serverTimestamp(),
        location: `LECTURERS_COLLECTION/${email}`
      });

      // 🔹 Create placeholder subcollections under main lecturer doc
      const subcollections = ['MESSAGES', 'NOTIFICATIONS', 'LOGS', 'CONTACTS', 'PROFILE'];
      for (const sub of subcollections) {
        const subDocRef = doc(this.firestore, `lecturers/${email}/${sub}/placeholder`);
        await setDoc(subDocRef, { init: true, createdAt: serverTimestamp() });
      }

      alert('✅ Lecturer added successfully with location field and subcollections!');
      this.lecturerForm.reset();
      this.lecturerForm.get('photo')?.setValue(null);

    } catch (error) {
      console.error('❌ Error adding lecturer:', error);
      alert('Error saving lecturer. Check console.');
    }
  }
}
