import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc, arrayUnion, increment } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-chat-login',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './admin-chat-login.html',
  styleUrl: './admin-chat-login.css'
})
export class AdminChatLogin {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login() {
    const { username, password } = this.loginForm.value;
    console.log('🔹 Login attempt started');
    console.log('➡️ Entered username:', username);

    try {
      // 🔹 Step 1: Get admin doc
      const adminDocRef = doc(this.firestore, `ADMINISTRATORS_ACCOUNT/${username}`);
      console.log('📂 Fetching Firestore doc:', adminDocRef.path);

      const adminSnap = await getDoc(adminDocRef);

      if (!adminSnap.exists()) {
        console.warn('❌ No admin account found for username:', username);
        this.errorMessage = 'Invalid username or password';
        return;
      }

      console.log('✅ Admin document found');
      const adminData: any = adminSnap.data();

      // 🔹 Step 2: Check password
      console.log('🔍 Checking password for user:', username);
      if (adminData.password === password) {
        console.log('✅ Password matched');

        // 🔹 Step 3: Update login logs
        console.log('📝 Updating login logs for user:', username);
        await updateDoc(adminDocRef, {
          loginLogs: arrayUnion(new Date().toISOString()),
          loginAttempts: increment(1),
          success: increment(1)
        });
        console.log('✅ Login logs updated successfully');

        // 🔹 Step 4: Save session
        console.log('💾 Saving session data to localStorage');
        localStorage.setItem('adminData', JSON.stringify({ username, ...adminData }));

        // 🔹 Step 5: Redirect to dashboard
        console.log('➡️ Redirecting to dashboard for user:', username);
        this.router.navigate(['/dashboard', username]);
      } else {
        console.warn('❌ Wrong password entered for user:', username);

        // 🔹 Update failed attempts
        console.log('📝 Logging failed attempt');
        await updateDoc(adminDocRef, {
          loginAttempts: increment(1),
          failed: increment(1)
        });
        console.log('✅ Failed attempt logged');

        this.errorMessage = 'Invalid username or password';
      }
    } catch (error) {
      console.error('🔥 Login error:', error);
      this.errorMessage = 'An error occurred. Please try again.';
    }
  }
}
