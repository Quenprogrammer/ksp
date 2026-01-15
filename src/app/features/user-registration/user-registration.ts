import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-registration',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.css',
})
export class UserRegistration {
  registrationForm: FormGroup;
  submitting = false;
  message = '';

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
  }

  async submitForm() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const userData = this.registrationForm.value;

    try {
      const usersCollection = collection(this.firestore, 'users');
      await addDoc(usersCollection, userData);
      this.message = 'User registered successfully!';
      this.registrationForm.reset();
    } catch (error) {
      console.error(error);
      this.message = 'Error registering user. Please try again.';
    } finally {
      this.submitting = false;
    }
  }
}
