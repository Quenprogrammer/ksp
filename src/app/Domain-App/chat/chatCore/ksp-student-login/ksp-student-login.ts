import {Component, Input, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from '@angular/fire/firestore';
import { Router, RouterLink } from '@angular/router';
import {StudentContextService} from '../../../../services/student-context';

@Component({
  selector: 'app-ksp-student-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ksp-student-login.html',
  styleUrls: ['./ksp-student-login.css']
})
export class KspStudentLogin implements OnInit {
  @Input() collection: string = 'STUDENTS_COLLECTION';
  @Input() adminTex: string = 'Contact Administrators';
  @Input() adminLink: string = '/default';
  @Input() loginImage: string = 'chatIcons/poly/polyWhiteLogo.png';
  @Input() routePage: string = '/dashboard';
  @Input() loginHeaderDetail: string = 'Registration No.';
  @Input() headerText: string = 'Student Login';
  @Input() localStoragePath: string = 'KSP_STUDENT';
  @Input() localStoragePathID: string = 'KSP_STUDENT_DOC_ID';
  @Input() createAccount: string = '/studentCreatAccount';
  loginForm!: FormGroup;
  message = '';
  isSuccess = false;
  loading = false;
  studentData: any = null;

  // Live login statistics signal
  loginStats = signal({ success: 0, fail: 0, notFound: 0 });

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private router: Router,
    private studentContext: StudentContextService // ✅ inject shared service
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.fetchLoginStats();
  }

  // --- Firestore helper: increment login stats ---
  private async updateLoginStats(status: 'success' | 'fail' | 'notFound') {
    const statsDocRef = doc(this.firestore, 'loginLogs/studentLoginStats');
    const snapshot = await getDoc(statsDocRef);

    if (snapshot.exists()) {
      await updateDoc(statsDocRef, { [status]: increment(1) });
    } else {
      const initialData = { success: 0, fail: 0, notFound: 0 };
      initialData[status] = 1;
      await setDoc(statsDocRef, initialData);
    }

    await this.fetchLoginStats();
  }

  // --- Fetch login stats from Firestore ---
  async fetchLoginStats() {
    try {
      const statsDocRef = doc(this.firestore, 'loginLogs/studentLoginStats');
      const snapshot = await getDoc(statsDocRef);

      if (snapshot.exists()) {
        this.loginStats.set(snapshot.data() as { success: number; fail: number; notFound: number });
      } else {
        this.loginStats.set({ success: 0, fail: 0, notFound: 0 });
      }
    } catch (err) {
      console.error('Error fetching login stats:', err);
    }
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.message = '⚠️ Please fill all fields correctly.';
      this.isSuccess = false;
      return;
    }

    this.loading = true;
    this.message = '';

    const { email, password } = this.loginForm.value;

    try {
      const studentsRef = collection(this.firestore, this.collection);
      const q = query(
        studentsRef,
        where('email', '==', email.trim().toLowerCase()),
        where('password', '==', password.trim())
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        this.message = '❌ Invalid email or password.';
        this.isSuccess = false;
        await this.updateLoginStats('notFound');
      } else {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();

        // Remove sensitive fields like password
        const { password, ...studentWithoutPassword } = data;

        // Save student data in localStorage
        localStorage.setItem(this.localStoragePath, JSON.stringify(studentWithoutPassword));
        localStorage.setItem(this.localStoragePathID, docSnap.id);

        this.studentContext.setStudent(studentWithoutPassword);

        this.studentData = studentWithoutPassword;
        this.isSuccess = true;
        this.message = '✅ Login successful!';
        await this.updateLoginStats('success');

        // Navigate to dashboard
        this.router.navigate([this.routePage]);
      }
    } catch (err) {
      console.error('Login error:', err);
      this.message = '⚠️ Login failed. Please try again.';
      this.isSuccess = false;
      await this.updateLoginStats('fail');
    } finally {
      this.loading = false;
    }
  }

  // --- Stats Computations ---
  get totalAttempts() {
    const stats = this.loginStats();
    const total = stats.success + stats.fail + stats.notFound;
    return total > 0 ? total : 1;
  }
  get successPercent() { return (this.loginStats().success / this.totalAttempts) * 100; }
  get failPercent() { return (this.loginStats().fail / this.totalAttempts) * 100; }
  get notFoundPercent() { return (this.loginStats().notFound / this.totalAttempts) * 100; }

  get f() {
    return this.loginForm.controls;
  }
}
