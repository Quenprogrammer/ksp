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
      school: ['', ],      // dropdown
      gender: ['', ]       // dropdown
    });

  }

  async onSubmit() {
    console.log('Form submission started.');

    if (this.signupForm.invalid) {
      console.log('Form invalid:', this.signupForm.value);
      this.message = 'Please fill all required fields correctly.';
      return;
    }

    this.loading = true;
    this.message = '';

    const { name, email, phone, password, department, regNo, course, level, school, gender } = this.signupForm.value;
    console.log('Form values:', { name, email, phone, password, department, regNo, course, level, school, gender });

    try {
      // Check if student exists in main 'students' collection
      console.log(`Checking main students collection for regNo: ${regNo}`);
      const mainStudentRef = doc(this.firestore, 'FCAP_STUDENTSACCOUNT', regNo);
      const mainStudentSnap = await getDoc(mainStudentRef);

      if (!mainStudentSnap.exists()) {
        console.log('Student not found in main collection.');
        this.message = '❌ Student not uploaded in the main students collection.';
        this.loading = false;
        return;
      }
      console.log('Student exists in main collection.');

      // Check if student already exists under department
      console.log(`Checking if student already exists in department: ${department}`);
      const studentRef = doc(this.firestore, `FCAP_DEPARTMENTS/${department}/FCAP_STUDENT`, email);
      const studentSnap = await getDoc(studentRef);

      if (studentSnap.exists()) {
        console.log('Student already exists in department.');
        this.message = '❌ Student account already exists in this department.';
        this.loading = false;
        return;
      }
      console.log('Student does not exist in department. Proceeding to create.');

      // Prepare student data
      const studentData = {
        name, email, phone, password, department,
        registrationNumber: regNo, course, level, school, gender,
        createdOn: new Date().toISOString(),
        location: `FCAP_DEPARTMENTS/${department}/FCAP_STUDENT/${email}`
      };
      console.log('Student data prepared:', studentData);

      // Save student in department
      await setDoc(studentRef, studentData);
      console.log('Student saved in department.');

      // Save copy in STUDENTS_COLLECTION
      const copyRef = doc(this.firestore, 'STUDENTS_COLLECTION', email);
      await setDoc(copyRef, { ...studentData, location: `STUDENTS_COLLECTION/${email}` });
      console.log('Student saved in STUDENTS_COLLECTION.');

      // Create subcollections
      const subcollections = ['PROFILE', 'MESSAGES', 'NOTIFICATIONS', 'DEPARTMENT', 'CONTACT'];
      for (const sub of subcollections) {
        const subRef = doc(collection(this.firestore, `FCAP_STUDENT/${email}/${sub}`), 'init');
        await setDoc(subRef, { initialized: true, createdAt: new Date().toISOString() });
        console.log(`Subcollection '${sub}' created for student ${email}.`);
      }

      this.message = '✅ Account created successfully!';
      this.signupForm.reset();
      console.log('Form reset and process completed successfully.');
    } catch (err) {
      console.error('Error during account creation:', err);
      this.message = '⚠️ Error creating account. Please try again.';
    }

    this.loading = false;
    console.log('Form submission ended.');
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
