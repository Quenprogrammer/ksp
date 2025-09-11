import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Firestore, doc, updateDoc } from "@angular/fire/firestore";
import {StatisticsService,  } from '../../../../services/statistics.service'; // 👈 make sure you have this

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css'
})
export class CreateAccount {
  private fb = inject(FormBuilder);
  private firestore = inject(Firestore);
  constructor(private statsService: StatisticsService) {}

  applicantForm = this.fb.group({
    fullName: ['', Validators.required],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    maritalStatus: ['', Validators.required],
    nationality: ['', Validators.required],
    stateOfOrigin: ['', Validators.required],
    lgaOfOrigin: ['', Validators.required],
    placeOfBirth: ['', Validators.required],
    religion: ['', Validators.required],
    nin: ['', [Validators.required, Validators.minLength(11)]],
    bvn: ['', [Validators.required, Validators.minLength(11)]],
    idType: ['', Validators.required],
    idNumber: ['', Validators.required],
    phone: ['', Validators.required],
    altPhone: [''],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: [''],
    bankName: ['', Validators.required],
    accountNumber: ['', [Validators.required, Validators.minLength(10)]],
    accountType: ['', Validators.required],
    occupation: ['', Validators.required],
    employer: [''],
    monthlyIncome: ['', Validators.required],
    emergencyName: ['', Validators.required],
    emergencyPhone: ['', Validators.required],
    emergencyRelationship: ['', Validators.required]
  });

  async submitForm() {
    if (this.applicantForm.invalid) {
      this.applicantForm.markAllAsTouched();
      return;
    }

    const data = this.applicantForm.value;

    try {
      // Example: save to Firestore (change collection as needed)
      const docRef = doc(this.firestore, 'applicants', data.nin!);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });

      // ✅ Statistics Tracking
      if (data.gender) {
        this.statsService.increment(data.gender.toLowerCase()); // male/female
      }

      if (data.maritalStatus) {
        const key = data.maritalStatus.toLowerCase().replace(/\s+/g, '_');
        this.statsService.increment(`marital_${key}`);
      }

      if (data.stateOfOrigin) {
        const key = data.stateOfOrigin.toLowerCase().replace(/\s+/g, '_');
        this.statsService.increment(`origin_${key}`);
      }

      if (data.religion) {
        const key = data.religion.toLowerCase().replace(/\s+/g, '_');
        this.statsService.increment(`religion_${key}`);
      }

      if (data.bankName) {
        const key = data.bankName.toLowerCase().replace(/\s+/g, '_');
        this.statsService.increment(`bank_${key}`);
      }

      if (data.state) {
        const key = data.state.toLowerCase().replace(/\s+/g, '_');
        this.statsService.increment(`state_${key}`);
      }

      alert('Application submitted successfully!');
      this.applicantForm.reset();
    } catch (error) {
      console.error('Error saving applicant:', error);
    }
  }
}
