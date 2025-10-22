// basics-form.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

interface Country {
  code: string;
  name: string;
}

interface EmploymentEligibility {
  value: string;
  label: string;
}
@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.scss'
})
export class BasicDetailsComponent {
  @Output() nextStep = new EventEmitter<void>();

  basicsForm: FormGroup;

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
    { code: 'BR', name: 'Brazil' },
    { code: 'MX', name: 'Mexico' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'AT', name: 'Austria' }
  ];

  employmentEligibilityOptions: EmploymentEligibility[] = [
    { value: 'authorized', label: 'Authorized to work in the UK for any employer' },
    { value: 'sponsorship', label: 'Sponsorship required to work in the UK' },
    { value: 'not_specified', label: 'No specified' }
  ];

  phoneTypes: string[] = [
    'Mobile',
    'Home',
    'Work',
    'Fax',
    'Direct'
  ];

  constructor(private fb: FormBuilder) {
    this.basicsForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      country: ['US', Validators.required],
      employmentEligibility: ['authorized', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-\(\)]+$/)]],
      phoneType: ['Mobile', Validators.required],
      callPermission: [false],
      cvPrivacy: [false]
    });
  }

  ngOnInit(): void {
    // You can initialize with some default values if needed
  }

  // Form submission
  onSubmit(): void {
    if (this.basicsForm.valid) {
      const formData = {
        personalInfo: {
          firstName: this.basicsForm.get('firstName')?.value,
          lastName: this.basicsForm.get('lastName')?.value,
          country: this.basicsForm.get('country')?.value
        },
        employment: {
          eligibility: this.basicsForm.get('employmentEligibility')?.value
        },
        contactInfo: {
          email: this.basicsForm.get('email')?.value,
          phone: {
            number: this.basicsForm.get('phoneNumber')?.value,
            type: this.basicsForm.get('phoneType')?.value,
            callPermission: this.basicsForm.get('callPermission')?.value
          }
        },
        preferences: {
          cvPrivacy: this.basicsForm.get('cvPrivacy')?.value
        }
      };

      // Submit to console
      console.log('Basics Form Data:', formData);

      // Emit event to go to next step
      this.nextStep.emit();
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.basicsForm);
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  // Getter methods for easy access in template
  get firstName() { return this.basicsForm.get('firstName'); }
  get lastName() { return this.basicsForm.get('lastName'); }
  get email() { return this.basicsForm.get('email'); }
  get phoneNumber() { return this.basicsForm.get('phoneNumber'); }
}
