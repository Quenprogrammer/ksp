import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecturers-area',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './lecturers-area.html',
  styleUrls: ['./lecturers-area.css']
})
export class LecturersArea {

  searchForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      email: ['', Validators.email],
      phone: ['']
    });
  }

  async onSearch() {
    this.errorMessage = '';
    const { email, phone } = this.searchForm.value;

    if (!email && !phone) {
      this.errorMessage = 'Please enter email or phone to search.';
      return;
    }

    try {
      const collectionRef = collection(this.firestore, 'LECTURERS_COLLECTION');

      let docData: any = null;

      if (email) {
        const qEmail = query(collectionRef, where('email', '==', email));
        const emailSnap = await getDocs(qEmail);
        if (!emailSnap.empty) docData = emailSnap.docs[0].data();
      }

      if (!docData && phone) {
        const qPhone = query(collectionRef, where('phone', '==', phone));
        const phoneSnap = await getDocs(qPhone);
        if (!phoneSnap.empty) docData = phoneSnap.docs[0].data();
      }

      if (docData) {
        // Navigate to staffAccount page with lecturer data
        this.router.navigate(['/staffAccount'], { state: { lecturer: docData } });
      } else {
        this.errorMessage = 'No lecturer found with this email or phone.';
      }
    } catch (err) {
      console.error(err);
      this.errorMessage = 'Error searching lecturer. Check console.';
    }
  }
}
