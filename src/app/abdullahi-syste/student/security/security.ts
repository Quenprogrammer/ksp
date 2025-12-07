import { Component } from '@angular/core';
import {Message} from '../../../Domain-App/chat/message/message';

@Component({
  selector: 'app-security',
  imports: [
    Message
  ],
  templateUrl: './security.html',
  styleUrl: './security.css'
})
export class FCAPSecurity {
  rectorImage='loanSystemIcons/logo.jpg'
  body='Official FCAPT SECURITY'
  name='FCAPT Security'
  description = `This page provides students and staff with a secure platform to report safety and security-related issues within the Polytechnic.
It is designed to ensure a safe and peaceful campus environment by allowing individuals to quickly raise concerns that require the attention of the Security Department.

Through this page, users can:

- Report theft, vandalism, or loss of property.

- Lodge complaints about harassment, threats, or assaults.

- Alert the Security Unit about suspicious activities or persons.

- Request urgent security assistance or patrols.`;

  sidebar = 'col-lg-9 vh-100';
}
