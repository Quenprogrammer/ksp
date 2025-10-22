import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { PasswordModalComponent } from '../../../loan-system/admin/settings/guard/password-modal/password-modal.component';
import { AreaMenu } from '../area-menu/area-menu';

@Component({
  selector: 'app-student-affiares',
  imports: [
    NgIf,
    PasswordModalComponent,
    AreaMenu
  ],
  templateUrl: './student-affiares.html',
  styleUrls: ['./student-affiares.css']
})
export class StudentAffiares implements AfterViewInit {
  accessGranted = false;

  // Get reference to PasswordModalComponent
  @ViewChild(PasswordModalComponent) passwordModal!: PasswordModalComponent;

  // Student Affairs valid passwords
  private studentPasswords = ['student123', 'affairs2025'];

  ngAfterViewInit(): void {
    // Open password modal automatically when component loads
    this.passwordModal.open(this.studentPasswords);
  }

  onUnlock(success: boolean): void {
    this.accessGranted = success;

    if (!success) {
      console.warn('Access denied: wrong password');
    }
  }
}
