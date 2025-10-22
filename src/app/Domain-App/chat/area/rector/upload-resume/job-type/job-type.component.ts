import {Component, EventEmitter, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
interface Currency {
  code: string;
  name: string;
}
@Component({
  selector: 'app-job-type',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './job-type.component.html',
  styleUrl: './job-type.component.scss'
})
export class JobTypeComponent {
  @Output() previousStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();
  @Output() saveDraft = new EventEmitter<any>();

  jobPreferencesForm: FormGroup;
  selectedJobTypes: string[] = [];
  selectedSchedules: string[] = [];

  // Arrays for form data
  jobTypesArray1: string[] = [
    'Full time',
    'Contract',
    'Internship'
  ];

  jobTypesArray2: string[] = [
    'Part time',
    'Temporary',
    'Commission'
  ];

  scheduleArray: string[] = [
    'Overtime',
    'On Call',
    'Overnight Shift'
  ];

  daysArray: string[] = [
    'Monday to Friday',
    'Weekends',
    'Holidays',
    'No Weekends'
  ];

  shiftsArray: string[] = [
    'Day Shift',
    '8 Hour Shift',
    'Night Shift',
    '12 Hour Shift',
    '10 Hour Shift'
  ];

  currencies: Currency[] = [
    { code: 'USD', name: 'United States Dollar' },
    { code: 'GBP', name: 'United Kingdom Pound' },
    { code: 'EUR', name: 'Euro Member Countries' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' }
  ];

  salaryPeriods: string[] = [
    'per hour',
    'per day',
    'per week',
    'per month',
    'per year'
  ];

  constructor(private fb: FormBuilder) {
    this.jobPreferencesForm = this.fb.group({
      desiredJobTitle: ['', Validators.required],
      currency: ['USD', Validators.required],
      desiredSalary: ['', [Validators.required, Validators.min(0)]],
      salaryPeriod: ['per year', Validators.required],
      willingToRelocate: [false],
      links: this.fb.array([this.fb.control('', Validators.pattern('https?://.+'))])
    });
  }

  ngOnInit(): void {
    // Initialize with some default values if needed
    this.selectedJobTypes = ['Full time'];
    this.selectedSchedules = ['Monday to Friday', 'Day Shift'];
  }

  // Getter for links form array
  get links(): FormArray {
    return this.jobPreferencesForm.get('links') as FormArray;
  }

  // Job Type selection handler
  onJobTypeChange(event: any, jobType: string): void {
    if (event.target.checked) {
      if (!this.selectedJobTypes.includes(jobType)) {
        this.selectedJobTypes.push(jobType);
      }
    } else {
      const index = this.selectedJobTypes.indexOf(jobType);
      if (index > -1) {
        this.selectedJobTypes.splice(index, 1);
      }
    }
  }

  // Schedule selection handler
  onScheduleChange(event: any, schedule: string): void {
    if (event.target.checked) {
      if (!this.selectedSchedules.includes(schedule)) {
        this.selectedSchedules.push(schedule);
      }
    } else {
      const index = this.selectedSchedules.indexOf(schedule);
      if (index > -1) {
        this.selectedSchedules.splice(index, 1);
      }
    }
  }

  // Add new link
  addLink(): void {
    this.links.push(this.fb.control('', Validators.pattern('https?://.+')));
  }

  // Remove link
  removeLink(index: number): void {
    this.links.removeAt(index);
  }

  // Form submission
  onSubmit(): void {
    if (this.jobPreferencesForm.valid && this.selectedJobTypes.length > 0) {
      const formData = {
        desiredJobTitle: this.jobPreferencesForm.get('desiredJobTitle')?.value,
        desiredJobTypes: this.selectedJobTypes,
        desiredWorkSchedule: this.selectedSchedules,
        desiredSalary: {
          amount: this.jobPreferencesForm.get('desiredSalary')?.value,
          currency: this.jobPreferencesForm.get('currency')?.value,
          period: this.jobPreferencesForm.get('salaryPeriod')?.value
        },
        willingToRelocate: this.jobPreferencesForm.get('willingToRelocate')?.value,
        links: this.links.value.filter((link: string) => link.trim() !== '')
      };

      // Submit to console
      console.log('Job Preferences Form Data:', formData);

      // Emit event to complete the process
      this.nextStep.emit();
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.jobPreferencesForm);
    }
  }

  // Save as draft
  saveAsDraft(): void {
    const formData = {
      desiredJobTitle: this.jobPreferencesForm.get('desiredJobTitle')?.value,
      desiredJobTypes: this.selectedJobTypes,
      desiredWorkSchedule: this.selectedSchedules,
      desiredSalary: {
        amount: this.jobPreferencesForm.get('desiredSalary')?.value,
        currency: this.jobPreferencesForm.get('currency')?.value,
        period: this.jobPreferencesForm.get('salaryPeriod')?.value
      },
      willingToRelocate: this.jobPreferencesForm.get('willingToRelocate')?.value,
      links: this.links.value.filter((link: string) => link.trim() !== '')
    };

    console.log('Saving draft:', formData);
    this.saveDraft.emit(formData);
  }

  // Go to previous step
  goToPreviousStep(): void {
    this.previousStep.emit();
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
}
