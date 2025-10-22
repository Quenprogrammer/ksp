import {Component, EventEmitter, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
interface Country {
  code: string;
  name: string;
}

interface Month {
  value: string;
  name: string;
}
@Component({
  selector: 'app-worked-experience',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './worked-experience.component.html',
  styleUrl: './worked-experience.component.scss'
})
export class WorkedExperienceComponent {
  @Output() previousStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();

  workExperienceForm: FormGroup;

  // Arrays for dropdown values
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
    // Add more countries as needed
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
    this.workExperienceForm = this.fb.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      country: ['US', Validators.required],
      currentlyWorking: [false],
      startMonth: ['01', Validators.required],
      startYear: [new Date().getFullYear(), Validators.required],
      endMonth: ['01'],
      endYear: [new Date().getFullYear()],
      description: [''],
      additionalWorkExperiences: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Watch for currentlyWorking changes to handle end date validation
    this.workExperienceForm.get('currentlyWorking')?.valueChanges.subscribe(value => {
      if (value) {
        this.workExperienceForm.get('endMonth')?.clearValidators();
        this.workExperienceForm.get('endYear')?.clearValidators();
      } else {
        this.workExperienceForm.get('endMonth')?.setValidators(Validators.required);
        this.workExperienceForm.get('endYear')?.setValidators(Validators.required);
      }
      this.workExperienceForm.get('endMonth')?.updateValueAndValidity();
      this.workExperienceForm.get('endYear')?.updateValueAndValidity();
    });
  }

  // Getter for additional work experiences form array
  get additionalWorkExperiences(): FormArray {
    return this.workExperienceForm.get('additionalWorkExperiences') as FormArray;
  }

  // Generate years array
  private generateYears(start: number, end: number): number[] {
    const years = [];
    for (let year = end; year >= start; year--) {
      years.push(year);
    }
    return years;
  }

  // Create additional work experience form group
  createAdditionalWorkExperience(): FormGroup {
    return this.fb.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      country: ['US', Validators.required],
      currentlyWorking: [false],
      startMonth: ['01', Validators.required],
      startYear: [new Date().getFullYear(), Validators.required],
      endMonth: ['01'],
      endYear: [new Date().getFullYear()],
      description: ['']
    });
  }

  // Add additional work experience
  addAdditionalWork(): void {
    this.additionalWorkExperiences.push(this.createAdditionalWorkExperience());
  }

  // Remove additional work experience
  removeAdditionalWork(index: number): void {
    this.additionalWorkExperiences.removeAt(index);
  }

  // Form submission
  onSubmit(): void {
    if (this.workExperienceForm.valid) {
      const formData = {
        primaryWork: {
          jobTitle: this.workExperienceForm.get('jobTitle')?.value,
          company: this.workExperienceForm.get('company')?.value,
          country: this.workExperienceForm.get('country')?.value,
          currentlyWorking: this.workExperienceForm.get('currentlyWorking')?.value,
          startDate: {
            month: this.workExperienceForm.get('startMonth')?.value,
            year: this.workExperienceForm.get('startYear')?.value
          },
          endDate: this.workExperienceForm.get('currentlyWorking')?.value ? null : {
            month: this.workExperienceForm.get('endMonth')?.value,
            year: this.workExperienceForm.get('endYear')?.value
          },
          description: this.workExperienceForm.get('description')?.value
        },
        additionalWork: this.additionalWorkExperiences.value
      };

      // Submit to console
      console.log('Work Experience Form Data:', formData);

      // Emit event to go to next step
      this.nextStep.emit();
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.workExperienceForm);
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
