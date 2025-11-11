import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { PasswordModalComponent } from '../../../loan-system/admin/settings/guard/password-modal/password-modal.component';
import { AreaMenu } from '../area-menu/area-menu';
import {Basic} from '../area-menu/basic/basic';

@Component({
  selector: 'app-student-affiares',
  imports: [
    NgIf,
    PasswordModalComponent,
    AreaMenu,
    Basic
  ],
  templateUrl: './student-affiares.html',
  styleUrls: ['./student-affiares.css']
})
export class StudentAffiares implements AfterViewInit {
  accessGranted = false;

  // Get reference to PasswordModalComponent
  @ViewChild(PasswordModalComponent) passwordModal!: PasswordModalComponent;

  // Student Affairs valid passwords
  private studentPasswords = ['1', 'affairs2025'];

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

  basicFormData = [
    { label: 'Department Name', value: 'Student Affairs' },
    { label: 'HEAD Name', value: 'Dr. Ibrahim Musa' },
    { label: 'Office Location', value: 'Admin Building, 2nd Floor' },
    { label: 'Office Email', value: 'studentaffairs@ksp.edu.ng', type: 'email' },
    { label: 'Office Phone', value: '+234 803 123 4567', type: 'tel' },
    { label: 'Working Hours', value: 'Mon-Fri 8am-4pm' },
    { label: 'Complaint Categories', value: 'Academic, Hostel, Fees' },
    { label: 'Submission Channels', value: 'Online Form, Email, Physical' },
    { label: 'Estimated Response Time', value: '3-5 working days' }
  ];

}
