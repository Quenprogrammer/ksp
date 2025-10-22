import { Component } from '@angular/core';
import {Message} from './message';

@Component({
  selector: 'app-security-issues',
  imports: [
    Message
  ],
  template: `
    <app-message [sidebarClass]="sidebar" [sidebar]="false" [logo]="rectorImage" [description]="description" [header]="name" [body]="body" [collection]="'KSP_SECURITY'"></app-message>

  `
})
export class SecurityIssues {
  rectorImage='chatIcons/poly/blacklogo.png'
  body='Official KSP SECURITY'
  name='KSP Security'
  description = `This page provides students and staff with a secure platform to report safety and security-related issues within the Polytechnic.
It is designed to ensure a safe and peaceful campus environment by allowing individuals to quickly raise concerns that require the attention of the Security Department.

Through this page, users can:

- Report theft, vandalism, or loss of property.

- Lodge complaints about harassment, threats, or assaults.

- Alert the Security Unit about suspicious activities or persons.

- Request urgent security assistance or patrols.`;

  sidebar = 'col-lg-9 vh-100';
}
