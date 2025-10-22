// education-form.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";

interface Country {
  code: string;
  name: string;
}

interface EducationLevel {
  value: string;
  label: string;
}

interface Month {
  value: string;
  name: string;
}
@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  @Output() previousStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();

  educationForm: FormGroup;

  // Arrays for dropdown values
  educationLevels: EducationLevel[] = [
    { value: 'middle_school', label: 'Middle school education' },
    { value: 'high_school', label: 'High school diploma' },
    { value: 'associate', label: 'Associate\'s degree' },
    { value: 'bachelor', label: 'Bachelor\'s degree' },
    { value: 'master', label: 'Master\'s degree' },
    { value: 'doctoral', label: 'Doctoral degree' }
  ];

  countries: Country[] = [
    { code: 'US', name: 'United States of America' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IN', name: 'India' },
    { code: 'JP', name: 'Japan' },
    { code: 'CN', name: 'China' },
    { code: 'BR', name: 'Brazil' }
  ];

  months: Month[] = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  years: number[] = this.generateYears(1980, new Date().getFullYear());

  constructor(private fb: FormBuilder) {
    this.educationForm = this.fb.group({
      educationLevel: ['bachelor', Validators.required],
      fieldOfStudy: ['', Validators.required],
      schoolName: ['', Validators.required],
      country: ['US', Validators.required],
      currentlyEnrolled: [false],
      startMonth: ['01', Validators.required],
      startYear: [new Date().getFullYear(), Validators.required],
      endMonth: ['01'],
      endYear: [new Date().getFullYear()],
      additionalEducations: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Watch for currentlyEnrolled changes to handle end date validation
    this.educationForm.get('currentlyEnrolled')?.valueChanges.subscribe(value => {
      if (value) {
        this.educationForm.get('endMonth')?.clearValidators();
        this.educationForm.get('endYear')?.clearValidators();
      } else {
        this.educationForm.get('endMonth')?.setValidators(Validators.required);
        this.educationForm.get('endYear')?.setValidators(Validators.required);
      }
      this.educationForm.get('endMonth')?.updateValueAndValidity();
      this.educationForm.get('endYear')?.updateValueAndValidity();
    });
  }

  // Getter for additional educations form array
  get additionalEducations(): FormArray {
    return this.educationForm.get('additionalEducations') as FormArray;
  }

  // Generate years array
  private generateYears(start: number, end: number): number[] {
    const years = [];
    for (let year = end; year >= start; year--) {
      years.push(year);
    }
    return years;
  }

  // Create additional education form group
  createAdditionalEducation(): FormGroup {
    return this.fb.group({
      educationLevel: ['bachelor', Validators.required],
      fieldOfStudy: ['', Validators.required],
      schoolName: ['', Validators.required],
      country: ['US', Validators.required],
      currentlyEnrolled: [false],
      startMonth: ['01', Validators.required],
      startYear: [new Date().getFullYear(), Validators.required],
      endMonth: ['01'],
      endYear: [new Date().getFullYear()]
    });
  }

  // Add additional education
  addAdditionalEducation(): void {
    this.additionalEducations.push(this.createAdditionalEducation());
  }

  // Remove additional education
  removeAdditionalEducation(index: number): void {
    this.additionalEducations.removeAt(index);
  }

  // Form submission
  onSubmit(): void {
    if (this.educationForm.valid) {
      const formData = {
        primaryEducation: {
          educationLevel: this.educationForm.get('educationLevel')?.value,
          fieldOfStudy: this.educationForm.get('fieldOfStudy')?.value,
          schoolName: this.educationForm.get('schoolName')?.value,
          country: this.educationForm.get('country')?.value,
          currentlyEnrolled: this.educationForm.get('currentlyEnrolled')?.value,
          startDate: {
            month: this.educationForm.get('startMonth')?.value,
            year: this.educationForm.get('startYear')?.value
          },
          endDate: this.educationForm.get('currentlyEnrolled')?.value ? null : {
            month: this.educationForm.get('endMonth')?.value,
            year: this.educationForm.get('endYear')?.value
          }
        },
        additionalEducations: this.additionalEducations.value
      };

      // Submit to console
      console.log('Education Form Data:', formData);

      // Emit event to go to next step
      this.nextStep.emit();
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.educationForm);
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  goToPreviousStep(): void {
    this.previousStep.emit();
  }
}
