import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      alert('Please fill all fields correctly!');
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    try {
      this.loading = true;

      const userDocRef = doc(this.firestore, `users/${email}`);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        alert('User not found!');
        this.loading = false;
        return;
      }

      const userData = userSnap.data();

      if (userData && userData['password'] === password) {
        // ✅ Save email (docID) in localStorage for dashboard
        localStorage.setItem('userEmail', email);

        // ✅ Navigate to dashboard
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid email or password!');
      }

    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      this.loading = false;
    }
  }
}
