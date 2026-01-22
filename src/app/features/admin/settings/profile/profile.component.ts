import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import {ProfileUpdateService} from '../../../system/vendor/profile-update.service';

@Component({
  selector: 'lh-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  vendorId = 'sample_vendor_id'; // Replace dynamically in real use
  loading = true;
  isSaving = false;
  statusMessage = '';
  avatarUrl: string | null = null;


  get f() {
    return this.profileForm.controls;
  }

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private profileService: ProfileUpdateService) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      description: ['', Validators.required],
      allowContact: [false],
    });
  }

  async ngOnInit() {
    try {
      const data = await this.profileService.getProfile(this.vendorId);
      if (data) {
        this.profileForm.patchValue(data);
        this.avatarUrl = data['avatarUrl'] || null;

        this.statusMessage = 'Profile loaded';
      }
    } catch (err) {
      console.error('Error loading vendor profile:', err);
      this.statusMessage = 'Error loading profile';
    } finally {
      this.loading = false;
    }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.isSaving = true;
    this.statusMessage = 'Uploading...';

    try {
      const storage = getStorage();
      const filePath = `profile_images/${this.vendorId}_${file.name}`;
      const storageRef = ref(storage, filePath);

      // Upload to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Save the URL to Firestore
      await this.profileService.saveProfile(this.vendorId, { avatarUrl: downloadURL });

      this.avatarUrl = downloadURL;
      this.statusMessage = 'Profile picture updated';
    } catch (err) {
      console.error('Error uploading image:', err);
      this.statusMessage = 'Error uploading image';
    } finally {
      this.isSaving = false;
      setTimeout(() => (this.statusMessage = ''), 2000);
    }
  }

  async removeAvatar() {
    if (!this.avatarUrl) return;

    this.isSaving = true;
    this.statusMessage = 'Removing...';

    try {
      const storage = getStorage();
      const fileRef = ref(storage, this.avatarUrl);

      // Delete from Firebase Storage
      await deleteObject(fileRef);

      // Remove from Firestore
      await this.profileService.saveProfile(this.vendorId, { avatarUrl: null });

      this.avatarUrl = null;
      this.statusMessage = 'Profile picture removed';
    } catch (err) {
      console.error('Error removing image:', err);
      this.statusMessage = 'Error removing picture';
    } finally {
      this.isSaving = false;
      setTimeout(() => (this.statusMessage = ''), 2000);
    }
  }

  async onFieldBlur() {
    if (this.profileForm.valid) {
      this.isSaving = true;
      this.statusMessage = 'Saving...';
      try {
        await this.profileService.saveProfile(this.vendorId, this.profileForm.value);
        this.statusMessage = 'Saved';
      } catch (err) {
        console.error('Error saving profile:', err);
        this.statusMessage = 'Error saving profile';
      } finally {
        this.isSaving = false;
        setTimeout(() => (this.statusMessage = ''), 2000);
      }
    }
  }

  async onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    await this.onFieldBlur();
  }

  onReset() {
    this.profileForm.reset();
  }
}
