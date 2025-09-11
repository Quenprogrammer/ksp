import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-student',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-student.html',
  styleUrl: './add-student.scss'
})
export class AddStudent {
  emailForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.emailForm = this.fb.group({
      emails: this.fb.array([this.createEmailField()])
    });
  }

  // Getter for easy access in template
  get emails(): FormArray {
    return this.emailForm.get('emails') as FormArray;
  }

  // Create a single email FormControl
  private createEmailField(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Add new email field
  addEmail(): void {
    this.emails.push(this.createEmailField());
  }

  // Remove email field
  removeEmail(index: number): void {
    if (this.emails.length > 1) {
      this.emails.removeAt(index);
    }
  }

  // Save each email into its own collection
  async onSubmit(): Promise<void> {
    if (this.emailForm.valid) {
      try {
        for (const emailGroup of this.emailForm.value.emails) {
          const email = emailGroup.email;

          // ⚠️ Firestore collection names cannot have `/`, so replace with `_`
          const safeEmail = email.replace(/\//g, '_');

          const emailCollection = collection(this.firestore, safeEmail);
          await addDoc(emailCollection, {
            createdAt: new Date(),
            info: `Data for ${email}`
          });

          console.log(`Saved into collection: ${safeEmail}`);
        }

        // reset after save
        this.emailForm.reset();
        this.emails.clear();
        this.addEmail();
      } catch (error) {
        console.error('Error saving student:', error);
      }
    } else {
      console.log('Form invalid');
    }
  }
}
