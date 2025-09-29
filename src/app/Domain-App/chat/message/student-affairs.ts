import { Component } from '@angular/core';
import {Message} from './message';

@Component({
  selector: 'app-student-affairs',
  imports: [
    Message
  ],
  template: `
    <app-message [sidebar]="false" [depCOLOR]="'black'" [logo]="rectorImage" [description]="description" [header]="name" [body]="body" ></app-message>

  `
})
export class StudentAffairs {
  rectorImage='chatIcons/poly/img.png'
  body='Official student affairs'
  name='KSP Student Affairs'
  description='This page is dedicated to handling complaints, concerns, and requests related to student welfare and campus life. It serves as a direct channel for students to communicate issues affecting their academic, social, or personal experience within the Polytechnic. The goal of this platform is to ensure that every student’s voice is heard, problems are addressed fairly, and student welfare remains a top priority.'

}
