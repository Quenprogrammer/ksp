import { Component } from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {ChatHeader} from '../../../Domain-App/chat/chat-header/chat-header';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf,
    DatePipe,
    ChatHeader
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  student: any = null;

  ngOnInit() {
    const storedStudent = localStorage.getItem('FACAPT_STUDENT_DATA');

    if (storedStudent) {
      this.student = JSON.parse(storedStudent);
    }
  }
}
