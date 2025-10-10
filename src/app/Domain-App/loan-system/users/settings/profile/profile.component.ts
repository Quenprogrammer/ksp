import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ProfileUpdateService } from './profile-update.service';

interface ProfileFormModel {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  description: string;
  allowContact: boolean;
}

@Component({
  selector: 'lh-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileUpdateService
  ) {
    // ✅ Initialize inside constructor to avoid “used before initialization” error
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      description: ['', Validators.required],
      allowContact: [false]
    });
  }

  // ✅ Strongly typed getter for cleaner template syntax
  get f() {
    return this.profileForm.controls;
  }

  async onSubmit() {
    console.log('📝 onSubmit() triggered');

    if (this.profileForm.invalid) {
      console.warn('⚠️ Form invalid, marking all as touched');
      this.profileForm.markAllAsTouched();
      return;
    }

    console.log('✅ Form is valid');
    console.log('📦 Form data to be saved:', this.profileForm.value);

    try {
      console.log('⏳ Saving profile to Firestore...');
      await this.profileService.saveProfile(this.profileForm.value as ProfileFormModel);
      console.log('🎉 Profile saved successfully!');
    } catch (err) {
      console.error('❌ Error saving profile:', err);
    }
  }

  onReset() {
    console.log('🔄 Resetting form...');
    this.profileForm.reset();
    console.log('✅ Form reset complete');
  }
}
