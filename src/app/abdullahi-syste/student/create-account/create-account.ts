import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {collection, doc, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-create-account',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css'
})
export class CreateAccount {
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
      department: ['', ],
      regNo: ['', ],
      course: ['', ],
      level: ['', ],
      school: ['FCAPT', ],      // dropdown
      gender: ['', ]       // dropdown
    });

  }

  async onSubmit() {
    if (this.signupForm.invalid) {
      this.message = 'Please fill all required fields correctly.';
      return;
    }

    this.loading = true;
    this.message = '';

    const { name, email, phone, password, department, regNo, course, level, school, gender } = this.signupForm.value;

    try {
      // Parent document in FCAP_STUDENT
      const parentRef = doc(this.firestore, `FCAP_STUDENT`, email);
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
        location: `FCAP_STUDENT/${email}`
      };

      // Create parent document
      await setDoc(parentRef, studentData);

      // Create subcollections
      const subcollections = ['PROFILE', 'MESSAGES', 'NOTIFICATIONS', 'DEPARTMENT', 'CONTACT'];
      for (const sub of subcollections) {
        const subRef = doc(collection(this.firestore, `FCAP_STUDENT/${email}/${sub}`), 'init');
        await setDoc(subRef, { initialized: true, createdAt: new Date().toISOString() });
      }

      this.message = '✅ Account created successfully!';
      this.signupForm.reset();
    } catch (err) {
      console.error('Error creating account:', err);
      this.message = '⚠️ Error creating account. Please try again.';
    }

    this.loading = false;
  }



  courses = [
    // Higher National Diploma Programmes (2 years)
    { name: 'Higher National Diploma in Pest Management Technology', level: 'HND' },
    { name: 'Higher National Diploma in Agricultural Extension & Management', level: 'HND' },
    { name: 'Higher National Diploma in Computer Science', level: 'HND' },
    { name: 'Higher National Diploma in Statistics', level: 'HND' },
    { name: 'Higher National Diploma in Animal Health Technology', level: 'HND' },
    { name: 'Higher National Diploma in Animal Production Technology', level: 'HND' },

    // National Diploma Programmes (2 years 4 semesters)
    { name: 'National Diploma in Agricultural Technology', level: 'ND' },
    { name: 'National Diploma in Animal Health and Production Technology', level: 'ND' },
    { name: 'National Diploma in Horticultural Technology', level: 'ND' },
    { name: 'National Diploma in Science Laboratory Technology', level: 'ND' },
    { name: 'National Diploma in Food Technology', level: 'ND' },
    { name: 'National Diploma in Nutrition and Dietetics', level: 'ND' },
    { name: 'National Diploma in Computer Science', level: 'ND' },
    { name: 'National Diploma in Statistics', level: 'ND' },

    // Diploma Programmes (4 semesters)
    { name: 'Diploma in Agribusiness Management', level: 'Diploma' },
    { name: 'Diploma in Computer Software Engineering', level: 'Diploma' },
    { name: 'Diploma in Poultry Production', level: 'Diploma' },
    { name: 'Diploma in Livestock Production and Health Technology', level: 'Diploma' },

    // Certificate Programmes (3 semesters)
    { name: 'Remedial Science Programmes', level: 'Certificate' },
    { name: 'Certificate in Agricultural Technology', level: 'Certificate' },
    { name: 'Certificate Programme in Food Storage Technology', level: 'Certificate' },
    { name: 'Certificate Programme in Pest Control', level: 'Certificate' },
    { name: 'Certificate Programme in Produce Inspection', level: 'Certificate' },
    { name: 'Certificate in Contract Farming and Agribusiness', level: 'Certificate' },
    { name: 'Advanced Certificate in Animal Health and Production Technology', level: 'Certificate' }
  ];


}
