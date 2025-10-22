import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PasswordModalComponent } from '../../../loan-system/admin/settings/guard/password-modal/password-modal.component';
import { NgIf } from '@angular/common';
import { AreaMenu } from '../area-menu/area-menu';

@Component({
  selector: 'app-ksp-security-area',
  imports: [
    PasswordModalComponent,
    NgIf,
    AreaMenu
  ],
  templateUrl: './ksp-security.html',
  styleUrls: ['./ksp-security.css']
})
export class KspSecurityArea implements AfterViewInit {
  accessGranted = false;

  // Reference the password modal
  @ViewChild(PasswordModalComponent) passwordModal!: PasswordModalComponent;

  // KSP Security valid passwords
  private kspPasswords = ['ksp2025', 'securityKey'];

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
