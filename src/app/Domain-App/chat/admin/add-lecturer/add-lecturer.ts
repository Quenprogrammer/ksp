import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
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
      photo: [null, Validators.required] // for now: file name (later: Firebase Storage)
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.lecturerForm.patchValue({ photo: file.name }); // save filename only
    }
  }

  async onSubmit() {
    if (this.lecturerForm.valid) {
      try {
        // 🔹 Step 1: Save in "lecturers"
        const lecturersRef = collection(this.firestore, 'lecturers');
        await addDoc(lecturersRef, this.lecturerForm.value);

        // 🔹 Step 2: Generate safe collectionName from fullName
        const fullName = this.lecturerForm.value.fullName;
        const collectionName = fullName.replace(/\s+/g, '_');

        // 🔹 Step 3: Create a doc under LECTURES_PROFILES with the lecturer's safe name
        const lecturerDocRef = doc(this.firestore, 'LECTURES_PROFILES', collectionName);

        // 🔹 Step 4: Inside LECTURES_PROFILES/{lecturer}, create PROFILE/info
        const profileDocRef = doc(this.firestore, `LECTURES_PROFILES/${collectionName}/PROFILE/info`);
        await setDoc(profileDocRef, {
          ...this.lecturerForm.value,
          collectionName, // ✅ save collectionName too
          createdAt: new Date()
        });

        // 🔹 Step 5: Ensure MESSAGES subcollection exists (create placeholder doc)
        const messagesDocRef = doc(this.firestore, `LECTURES_PROFILES/${collectionName}/MESSAGES/placeholder`);
        await setDoc(messagesDocRef, {
          init: true,
          createdAt: new Date()
        });

        console.log('✅ Lecturer added + profile + messages collection created!');
        alert('Lecturer added successfully!');

        this.lecturerForm.reset();
      } catch (error) {
        console.error('❌ Error adding lecturer:', error);
        alert('Error saving lecturer. Check console.');
      }
    } else {
      console.log('⚠️ Form Invalid');
      alert('Please fill all required fields.');
    }
  }
}
