import {Component, Input} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { Firestore, doc, setDoc, serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.scss']
})
export class AddStudent {
  studentForm: FormGroup;
  @Input() collection: string = 'students';
  @Input() IMG: string = 'chatIcons/poly/poly.png';
  @Input() header: string = 'Upload Student';
  @Input() subHeader: string = 'Amfanin Ilimi Aiki Dashi';
  constructor(private fb: FormBuilder, private firestore: Firestore) {
    console.log('🚀 Initializing AddStudent component...');
    this.studentForm = this.fb.group({
      students: this.fb.array([this.createStudentField()])
    });
    console.log('✅ Form initialized with one empty student field.');
  }

  get students(): FormArray {
    return this.studentForm.get('students') as FormArray;
  }

  private createStudentField(): FormGroup {
    console.log('🧩 Creating a new student input field...');
    return this.fb.group({
      regNo: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addStudent(): void {
    console.log('➕ Adding new student field...');
    this.students.push(this.createStudentField());
  }

  removeStudent(index: number): void {
    if (this.students.length > 1) {
      console.log(`🗑️ Removing student field at index ${index}`);
      this.students.removeAt(index);
    } else {
      console.warn('⚠️ At least one student input must remain.');
    }
  }

  async onSubmit(): Promise<void> {
    console.log('🚀 Form submission started.');

    if (!this.studentForm.valid) {
      console.warn('⚠️ Form invalid, please check inputs.');
      alert('Please fill all fields correctly before submitting.');
      return;
    }

    try {
      console.log('✅ Form is valid. Preparing to save data...');
      console.table(this.studentForm.value.students);

      for (const [index, studentGroup] of this.studentForm.value.students.entries()) {
        const { regNo, email } = studentGroup;
        console.log(`📤 [${index + 1}] Processing student: RegNo=${regNo}, Email=${email}`);

        const studentDocRef = doc(this.firestore, `${this.collection}/${regNo.trim()}`);
        await setDoc(studentDocRef, {
          regNo: regNo.trim(),
          email: email.trim().toLowerCase(),
          createdAt: serverTimestamp()
        });

        console.log(`✅ Successfully saved: ${regNo}`);
      }

      this.studentForm.reset();
      this.students.clear();
      this.addStudent();

      console.log('🎉 All students saved successfully.');
      alert('✅ Students added successfully!');
    } catch (error: any) {
      console.error('❌ Error saving students:', error.message || error);
      alert(`❌ Failed to save: ${error.message || error}`);
    }
  }
}
