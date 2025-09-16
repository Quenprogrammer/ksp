import { Component } from '@angular/core';
import {addDoc, Firestore} from '@angular/fire/firestore';
import {collection} from 'firebase/firestore';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-system-diagonisis',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `<div class="diagnosis-container">
    <h2>System Diagnosis</h2>
    <p>The system lockdown configuration is missing or corrupted.</p>

    <form [formGroup]="diagnosisForm" (ngSubmit)="submitForm()">
      <div>
        <label for="description">Issue Description:</label>
        <textarea id="description" formControlName="description" rows="4" required></textarea>
      </div>

      <div>
        <label for="contact">Your Contact (optional):</label>
        <input id="contact" formControlName="contact" type="email" />
      </div>

      <button type="submit" [disabled]="diagnosisForm.invalid">Submit Report</button>
    </form>

    <p *ngIf="submitted">Thank you. Your report has been submitted.</p>
  </div>
  `,
  styles: [`
    .diagnosis-container {
      max-width: 500px;
      margin: auto;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 8px;

      h2 {
        margin-bottom: 1rem;
      }

      textarea,
      input {
        width: 100%;
        margin-bottom: 1rem;
        padding: 0.5rem;
      }

      button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
      }

      button:disabled {
        background-color: #ccc;
      }
    }

  `]
})
export class SystemDiagonisisComponent {
  diagnosisForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.diagnosisForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]],
      contact: [''],
    });
  }

  async submitForm() {
    if (this.diagnosisForm.invalid) return;

    const report = {
      ...this.diagnosisForm.value,
      timestamp: new Date(),
    };

    try {
      const reportsCollection = collection(this.firestore, 'system_diagnosis_reports');
      await addDoc(reportsCollection, report);
      this.submitted = true;
      this.diagnosisForm.reset();
    } catch (error) {
      console.error('Error submitting diagnosis:', error);
    }
  }
}
