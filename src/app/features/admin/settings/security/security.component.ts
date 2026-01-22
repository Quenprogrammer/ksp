import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

@Component({
  selector: 'lh-security',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, NgIf, DeleteAccountComponent],
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  statusMessage: string | null = null;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );
  }

  get f() {
    return this.passwordForm.controls;
  }

  ngOnInit() {}

  passwordsMatch = (group: AbstractControl) => {
    const newPass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return newPass === confirm ? null : { mismatch: true };
  };

  async autoSave(fieldName: keyof typeof this.passwordForm.controls) {
    const control = this.passwordForm.controls[fieldName];
    if (control.invalid) {
      this.statusMessage = 'Error: Fix the errors above';
      this.clearStatus();
      return;
    }

    this.statusMessage = 'Saving...';
    try {
      await new Promise((res) => setTimeout(res, 1000));
      console.log(`✅ Auto-saved ${fieldName}:`, control.value);
      this.statusMessage = 'Saved';
    } catch (err) {
      console.error(err);
      this.statusMessage = 'Error saving';
    } finally {
      this.clearStatus();
    }
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      this.statusMessage = 'Error: Fix the errors above';
      this.clearStatus();
      return;
    }
    console.log('✅ Form submitted:', this.passwordForm.value);
    this.statusMessage = 'All changes saved';
    this.clearStatus();
  }

  onReset() {
    this.passwordForm.reset();
    this.statusMessage = null;
  }

  private clearStatus() {
    setTimeout(() => {
      this.statusMessage = null;
    }, 3000);
  }
}
