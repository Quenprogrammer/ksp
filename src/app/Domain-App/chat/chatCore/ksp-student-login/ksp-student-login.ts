import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ksp-student-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ksp-student-login.html',
  styleUrls: ['./ksp-student-login.css']
})
export class KspStudentLogin implements OnInit {
  loginForm!: FormGroup;
  message = '';
  isSuccess = false;
  loading = false;
  studentData: any = null;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🧩 Initializing KspStudentLogin component...');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      regNo: ['', [Validators.required, Validators.minLength(2)]]
    });
    console.log('✅ Login form initialized with fields: email, regNo');
  }

  async onLogin() {
    console.log('🚀 Login process started...');
    if (this.loginForm.invalid) {
      console.warn('⚠️ Invalid form — please fill correctly:', this.loginForm.value);
      this.message = 'Please fill all fields correctly.';
      this.isSuccess = false;
      return;
    }

    this.loading = true;
    this.message = '';

    const { email, regNo } = this.loginForm.value;
    console.log(`📨 Attempting login for: Email=${email}, RegNo=${regNo}`);

    try {
      // Step 1: Query Firestore
      const studentsRef = collection(this.firestore, 'students');
      const q = query(
        studentsRef,
        where('email', '==', email.trim().toLowerCase()),
        where('regNo', '==', regNo.trim())
      );

      console.log('🔍 Running Firestore query...');
      const querySnapshot = await getDocs(q);

      // Step 2: Check if user exists
      if (querySnapshot.empty) {
        console.warn('❌ No matching student found for provided credentials.');
        this.message = '❌ Invalid email or registration number.';
        this.isSuccess = false;
      } else {
        // Step 3: Extract student data
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        console.log('📄 Raw Firestore student data:', data);

        // Step 4: Remove password before saving
        const { password, ...studentWithoutPassword } = data;
        console.log('🧹 Cleaned student data (without password):', studentWithoutPassword);

        // Step 5: Save to localStorage
        localStorage.setItem('student', JSON.stringify(studentWithoutPassword));
        console.log('💾 Student data saved to localStorage successfully.');
        console.log('📦 Stored value:', JSON.parse(localStorage.getItem('student') || '{}'));

        // Step 6: Set success message and redirect
        this.isSuccess = true;
        this.message = '✅ Login successful!';
        this.studentData = studentWithoutPassword;

        console.log('➡️ Redirecting to dashboard...');
        setTimeout(() => {
          this.router.navigate(['/dashboard'], { state: { student: studentWithoutPassword } });
        }, 1000);
      }
    } catch (err) {
      console.error('❌ Login Error:', err);
      this.message = '⚠️ Login failed. Please try again later.';
      this.isSuccess = false;
    } finally {
      this.loading = false;
      console.log('🏁 Login process completed.');
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}
