import { Component } from '@angular/core';
import {
    AffiliatePasswordComponent
} from "../../../../settings/affiliates/settings/affiliate-password/affiliate-password.component";
import {
    DeleteAffiliateAccountComponent
} from "../../../../settings/affiliates/settings/delete-affiliate-account/delete-affiliate-account.component";
import {NgIf} from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {
  AffiliateProfileService
} from '../../../../settings/affiliates/settings/affiliate-profile/affiliate-profile.service';
import {debounceTime} from 'rxjs/operators';
import {LecturerDeleteAccount} from '../lecturer-delete-account/lecturer-delete-account';

@Component({
  selector: 'app-lecturer-profile',
  imports: [
    AffiliatePasswordComponent,
    DeleteAffiliateAccountComponent,
    NgIf,
    ReactiveFormsModule,
    LecturerDeleteAccount
  ],
  templateUrl: './lecturer-profile.html',
  styleUrl: './lecturer-profile.css'
})
export class LecturerProfile {
  profileForm!: FormGroup;
  previewUrl: string | null = null;
  private docId = 'testUser123';
  statusMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private profileService: AffiliateProfileService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['', Validators.required],


      bio: ['', Validators.required],
      gender: ['', Validators.required],
      communication: this.fb.group(
        { email: [false], phone: [false] },
        { validators: this.atLeastOneRequiredValidator }
      ),
    });

    this.loadProfile();

    this.profileForm.valueChanges
      .pipe(debounceTime(800))
      .subscribe(async (changes) => {
        if (this.profileForm.valid) {
          this.statusMessage = 'Saving...';
          try {
            await this.profileService.autoUpdateProfile(this.docId, changes);
            this.statusMessage = 'Saved';
          } catch (err) {
            console.error(err);
            this.statusMessage = 'Error saving';
          }
          setTimeout(() => (this.statusMessage = ''), 2000); // Hide after 2 sec
        }
      });
  }

  get f() {
    return this.profileForm.controls;
  }

  atLeastOneRequiredValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const group = control as FormGroup;
    return group.get('email')?.value || group.get('phone')?.value
      ? null
      : { atLeastOneRequired: true };
  }

  async autoSaveField(controlName: string) {
    const control = this.profileForm.get(controlName);
    if (control && control.valid) {
      const value = control.value;
      this.statusMessage = 'Saving...';
      try {
        await this.profileService.saveField(this.docId, controlName, value);
        this.statusMessage = 'Saved';
      } catch (err) {
        console.error(err);
        this.statusMessage = 'Error saving';
      }
      setTimeout(() => (this.statusMessage = ''), 2000);
    }
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(file);

      this.statusMessage = 'Saving...';
      try {
        this.previewUrl = await this.profileService.uploadProfileImage(
          this.docId,
          file
        );
        this.statusMessage = 'Saved';
      } catch (err) {
        console.error(err);
        this.statusMessage = 'Error saving';
      }
      setTimeout(() => (this.statusMessage = ''), 2000);
    }
  }

  async loadProfile() {
    const data = await this.profileService.getProfile(this.docId);
    if (data) {
      this.profileForm.patchValue(data);
      if (data.profileImage) {
        this.previewUrl = data.profileImage;
      }
    }
  }

}
