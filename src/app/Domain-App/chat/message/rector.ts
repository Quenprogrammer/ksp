import { Component } from '@angular/core';
import {Message} from './message';

@Component({
  selector: 'app-rector',
  imports: [
    Message
  ],
  template: `
<app-message [depCOLOR]="'green'" [sidebarClass]="sidebar" [sidebar]="false" [logo]="rectorImage" [description]="description" [header]="name" [body]="body" [collection]="'RECTOR'"></app-message>

  `
})
export class Rector {
  sidebar = 'col-lg-9 vh-100';
rectorImage='chatIcons/poly/rector.jpg'
  body='Rector Kano State Polytechnic'
  name='Dr Abubakar Umar Farouk'
  description='This page provides a direct communication channel between students/staff and the Office of the Rector. It is designed to allow users to submit formal complaints, grievances, or concerns that require the Rector’s attention. Complaints submitted here are treated with the highest level of confidentiality and priority.'
class='text-center'
}
