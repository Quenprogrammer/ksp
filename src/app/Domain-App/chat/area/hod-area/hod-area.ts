import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { PasswordModalComponent } from '../../../loan-system/admin/settings/guard/password-modal/password-modal.component';
import { AreaMenu } from '../area-menu/area-menu';

@Component({
  selector: 'app-hod-area',
  imports: [
    NgIf,
    PasswordModalComponent,
    AreaMenu
  ],
  templateUrl: './hod-area.html',
  styleUrls: ['./hod-area.css']
})
export class HodArea implements AfterViewInit {
  accessGranted = false;

  // Reference the password modal
  @ViewChild(PasswordModalComponent) passwordModal!: PasswordModalComponent;

  // HOD valid passwords
  private hodPasswords = ['hod123', 'adminHOD2025'];

  ngAfterViewInit(): void {
    // Initialize password modal when component loads
    this.passwordModal.open(this.hodPasswords);
  }

  onUnlock(success: boolean): void {
    this.accessGranted = success;

    if (!success) {
      console.warn('Access denied: wrong password');
    }
  }
}
