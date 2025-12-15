import {Component, ViewChild} from '@angular/core';
import {AreaMenu} from '../area-menu/area-menu';
import {NgIf} from '@angular/common';
import {
  PasswordModalComponent
} from '../../../loan-system/admin/settings/guard/password-modal/password-modal.component';

@Component({
  selector: 'app-administrators',
  imports: [
    AreaMenu,
    NgIf,
    PasswordModalComponent
  ],
  templateUrl: './administrators.html',
  styleUrl: './administrators.css'
})
export class Administrators {
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
    { label: 'Department Name', value: 'Administrators' },
    { label: 'HOD Name', value: 'Mrs. Aisha Bello' },
    { label: 'Office Location', value: 'Admin Block, 1st Floor' },
    { label: 'Office Email', value: 'administration@ksp.edu.ng', type: 'email' },
    { label: 'Office Phone', value: '+234 801 234 5678', type: 'tel' },
    { label: 'Working Hours', value: 'Mon-Fri 8am-5pm' },
    { label: 'Complaint Categories', value: 'General Administration, Policy Issues, Staff Concerns' },
    { label: 'Submission Channels', value: 'Online Form, Email, Physical' },
    { label: 'Estimated Response Time', value: '2-3 working days' },
    { label: 'Complaint Tracking Link', value: 'portal.ksp.edu.ng/administration-complaint', type: 'url' }
  ];

}
