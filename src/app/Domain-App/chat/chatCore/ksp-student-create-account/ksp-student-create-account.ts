import { Component } from '@angular/core';
import {CommonModule, NgClass, NgForOf, NgIf} from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Firestore, doc, getDoc, setDoc, collection } from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ksp-student-create-account',
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink, NgForOf],
  templateUrl: './ksp-student-create-account.html',
  styleUrl: './ksp-student-create-account.css'
})
export class KspStudentCreateAccount {
  signupForm: any;
  message = '';
  loading = false;

  constructor(private fb: FormBuilder, private firestore: Firestore) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      department: ['', [Validators.required]],
      regNo: ['', [Validators.required]],
      course: ['', [Validators.required]],
      level: ['', [Validators.required]],
      school: ['', [Validators.required]],      // dropdown
      gender: ['', [Validators.required]]       // dropdown
    });

  }

  async onSubmit() {
    if (this.signupForm.invalid) {
      this.message = 'Please fill all required fields correctly.';
      return;
    }

    this.loading = true;
    this.message = '';

    const {
      name, email, phone, password, department, regNo,
      course, level, school, gender
    } = this.signupForm.value;

    try {
      // Check if student exists in main 'students' collection by regNo
      const mainStudentRef = doc(this.firestore, 'students', regNo);
      const mainStudentSnap = await getDoc(mainStudentRef);

      if (!mainStudentSnap.exists()) {
        this.message = '❌ Student not uploaded in the main students collection.';
        this.loading = false;
        return;
      }

      // Department must exist
      const deptRef = doc(this.firestore, 'departments', department!);
      const deptSnap = await getDoc(deptRef);

      if (!deptSnap.exists()) {
        this.message = '❌ Department does not exist. Please contact admin.';
        this.loading = false;
        return;
      }

      // Check if student already exists under department
      const studentRef = doc(this.firestore, `departments/${department}/students`, email);
      const studentSnap = await getDoc(studentRef);

      if (studentSnap.exists()) {
        this.message = '❌ Student account already exists in this department.';
        this.loading = false;
        return;
      }

      // Save student data including all fields
      const studentData = {
        name,
        email,
        phone,
        password,
        department,
        registrationNumber: regNo,
        course,
        level,
        school,
        gender,
        createdOn: new Date().toISOString(),
        location: `departments/${department}/students/${email}` // full path
      };

      await setDoc(studentRef, studentData);

      // ✅ Save a copy in STUDENTS_COLLECTION
      const copyRef = doc(this.firestore, `STUDENTS_COLLECTION`, email);
      await setDoc(copyRef, {
        ...studentData,
        location: `STUDENTS_COLLECTION/${email}` // path of the copy
      });

      // Create subcollections inside students/{email}
      const subcollections = ['PROFILE', 'MESSAGES', 'NOTIFICATIONS', 'DEPARTMENT', 'CONTACT'];

      for (const sub of subcollections) {
        const subRef = doc(collection(this.firestore, `students/${email}/${sub}`), 'init');
        await setDoc(subRef, { initialized: true, createdAt: new Date().toISOString() });
      }

      this.message = '✅ Account created successfully!';
      this.signupForm.reset();
    } catch (err) {
      console.error(err);
      this.message = '⚠️ Error creating account. Please try again.';
    }

    this.loading = false;
  }

  courses = [
    { name: 'ND_Art_&_Industrial_Design' },
    { name: 'ND_Civil_Engineering_Technology' },
    { name: 'ND_Computer_Engineering_Technology' },
    { name: 'ND_Computer_Science' },
    { name: 'ND_Electrical/Electronic_Engineering_Technology' },
    { name: 'ND_Fashion_Design_&_Clothing_Technology' },
    { name: 'ND_Hospitality_Management_Technology' },
    { name: 'ND_Mechanical_Engineering_Technology' },
    { name: 'ND_Mechatronics_Engineering_Technology' },
    { name: 'ND_Pharmaceutical_Technology' },
    { name: 'ND_Printing_Technology' },
    { name: 'ND_Science_Laboratory_Technology' },
    { name: 'ND_Statistics' },
    { name: 'ND_Textile_Technology' },
    { name: 'ND_Tourism_Management' },
    { name: 'ND_Welding_&_Fabrication_Technology' },
    { name: 'NCE_(Tech)_Automobile_Technology' },
    { name: 'NCE_(Tech)_Woodwork_Technology' },
    { name: 'NCE_(Tech)_Electrical/Electronics_Engineering_Technology' },
    { name: 'NCE_(Tech)_Metalwork_Technology' },
    { name: 'NCE_(Tech)_Building_Technology' },
    { name: 'Pre-NCE_Technical' },
    { name: 'HND_Art_&_Industrial_Design_(Ceramics_Tech)' },
    { name: 'HND_Art_&_Industrial_Design_(Graphic_Design)' },
    { name: 'HND_Art_&_Industrial_Design_(Painting)' },
    { name: 'HND_Art_&_Industrial_Design_(Textile_Design)' },
    { name: 'HND_Computer_Science' },
    { name: 'HND_Electrical/Electronics_Engineering_(Telecoms/Electronics)' },
    { name: 'HND_Electrical/Electronics_Engineering_(Power)' },
    { name: 'HND_Mechanical_Engineering_Technology_(Plant/Power)' },
    { name: 'HND_Pharmaceutical_Technology' },
    { name: 'HND_Printing_Technology' },
    { name: 'HND_Science_Laboratory_Technology_(Physics/Electronics;_Chemistry;_Biochemistry;_Biology/Microbiology)' },
    { name: 'HND_Statistics' },
    { name: 'HND_Hospitality_Management' },
    { name: 'HND_Fashion_Design_&_Clothing_Technology' },
  ];

}
