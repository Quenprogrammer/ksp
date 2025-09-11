import { Component } from '@angular/core';
import {ChatHeader} from '../chat-header/chat-header';

@Component({
  selector: 'app-help-center',
  imports: [
    ChatHeader
  ],
  templateUrl: './help-center.html',
  styleUrl: './help-center.scss'
})
export class HelpCenter {
    contacts = [
    {
      type: 'Address',
      items: [
        {
          label: 'Office',
          value: 'BUK Road Kano, Nigeria',
          link: '#'
        }
      ]
    },
    {
      type: 'Phone',
      items: [
        {
          label: 'Phone Call',
          value: '+234 8158787522',
          link: 'tel:+2348158787522'
        }
      ]
    },
    {
      type: 'Email',
      items: [
        {
          label: 'Send Mail',
          value: 'info@kanopoly.edu.ng',
          link: 'mailto:info@kanopoly.edu.ng'
        }
      ]
    }
  ];


}
