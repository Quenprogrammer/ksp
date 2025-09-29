import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-chat-header',
  imports: [
    RouterLink
  ],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.scss'
})
export class ChatHeader {
  @Input() title: string = 'Kano State Polytechnic';
}
