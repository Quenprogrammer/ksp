import {Component, Input, signal, WritableSignal} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-view-messages',
  imports: [
    NgIf
  ],
  templateUrl: './view-messages.component.html',
  styleUrl: './view-messages.component.css'
})
export class ViewMessagesComponent {


  viewMessages = signal(false);
  unVerifiedStudentModalOpen = signal(false);
}
