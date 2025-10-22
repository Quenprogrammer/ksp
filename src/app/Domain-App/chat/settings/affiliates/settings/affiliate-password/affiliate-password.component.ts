import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'lh-affiliate-password',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './affiliate-password.component.html',
  styleUrl: './affiliate-password.component.scss',
})
export class AffiliatePasswordComponent {
  passwordForm!: FormGroup;

  // Password visibility toggles
  showCurrent = false;
  showNew = false;
  showConfirm = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  get f() {
    return this.passwordForm.controls;
  }

  // Custom validator for matching passwords
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      console.log('Password form data:', this.passwordForm.value);
    } else {
      this.passwordForm.markAllAsTouched();
      console.log('Form Invalid');
    }
  }
}
