import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore, doc, setDoc, collection } from '@angular/fire/firestore';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-account',
  imports: [
    ReactiveFormsModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss'
})
export class CreateAccount {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      alert('Please fill all fields correctly!');
      return;
    }

    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const phone = this.registerForm.get('phone')?.value;
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Use email as doc ID
      const userDocRef = doc(this.firestore, `users/${email}`);

      // Save main user data
      await setDoc(userDocRef, {
        name,
        email,
        phone,
        password, // ⚠️ Never store plain passwords in real apps!
        createdAt: new Date()
      });


      await setDoc(doc(collection(userDocRef, 'notifications')), { initialized: true });
      await setDoc(doc(collection(userDocRef, 'messages')), { initialized: true });
      await setDoc(doc(collection(userDocRef, 'transactions')), { initialized: true });
      await setDoc(doc(collection(userDocRef, 'settings')), { initialized: true });
      await setDoc(doc(collection(userDocRef, 'profile')), { initialized: true });
      await setDoc(doc(collection(userDocRef, 'logs')), { initialized: true });

      alert('User registered successfully!');
      this.registerForm.reset();

    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to register user.');
    }
  }
}
