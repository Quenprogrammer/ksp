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
  private kspPasswords = ['1', 'securityKey'];

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
  basicFormData = [
    { label: 'Department Name', value: 'KSP Security' },
    { label: 'HEAD Name', value: 'Mr. Sani Abdullahi' },
    { label: 'Office Location', value: 'Security Building, Main Gate' },
    { label: 'Office Email', value: 'security@ksp.edu.ng', type: 'email' },
    { label: 'Office Phone', value: '+234 802 345 6789', type: 'tel' },
    { label: 'Working Hours', value: '24/7' },
    { label: 'Complaint Categories', value: 'Theft, Harassment, Trespassing, Safety Concerns' },
    { label: 'Submission Channels', value: 'Online Form, Email, Physical' },
    { label: 'Estimated Response Time', value: 'Immediate to 24 hours' }
     ];

}
