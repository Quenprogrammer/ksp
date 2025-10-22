import {Component, ViewChild} from '@angular/core';
import {HeaderPoly} from "../../request/header-poly/header-poly";
import {NgIf} from '@angular/common';
import {
  PasswordModalComponent
} from '../../../loan-system/admin/settings/guard/password-modal/password-modal.component';
import {UploadResumeComponent} from './upload-resume/upload-resume.component';

@Component({
  selector: 'app-rector',
  imports: [
    HeaderPoly,
    NgIf,
    PasswordModalComponent,
    UploadResumeComponent,

  ],
  templateUrl: './rector.html',
  styleUrl: './rector.css'
})
export class KspRectorComponent {
  accessGranted = false;

  // Reference the password modal
  @ViewChild(PasswordModalComponent) passwordModal!: PasswordModalComponent;

  // KSP Security valid passwords
  private kspPasswords = ['2722', 'securityKey'];

  ngAfterViewInit(): void {
    // Open password modal when component loads
    this.passwordModal.open(this.kspPasswords);
  }

  onUnlock(success: boolean): void {
    this.accessGranted = success;

    if (!success) {
      console.warn('Access denied: wrong password');
    }
  }
}
